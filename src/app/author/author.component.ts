import { Component, OnInit } from '@angular/core';
import { AuthorService } from './author.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthorFormComponent } from './author-form/author-form.component';
import { Author } from '../../core/models/author.model';
import { EventsService } from '../../core/services/events';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {
  authors: any;

  constructor(private authorService: AuthorService,
              public dialog: MatDialog,
              private events: EventsService,
              private snackBar: MatSnackBar) {
    this.events.subscribe('update-author-list', () => {
      this.authorList();
    });
  }

  ngOnInit() {
    this.authorList();
  }

  openAuthor(author?): void {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '300px'
    });
    const instance = dialogRef.componentInstance;
    instance.author = author ? new Author(Object.assign({}, author) || {}) : new Author();
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.state) {
        const message = 'The author has been ' + result.state;
        this.snackBar.open(message, 'Ok', {
          duration: 2000,
        });
      }
    });
  }

  deleteAuthor(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px'
    });
    const instance: any = dialogRef.componentInstance;
    instance.message = 'Deleting this author will also delete all publications related. Are you sure you want to edit this?.';
    instance.title = 'Delete Author';
    instance.labelNo = 'No';
    instance.labelYes = 'Yes';
    instance.onOk = () => {
      this.authorService.delete(item)
          .subscribe(data => {
            const message = 'The author has been deleted';
            this.snackBar.open(message, 'Ok', {
              duration: 2000,
            });
            dialogRef.close(data);
            this.events.publish('update-publication-list', true);
            this.events.publish('update-author-list', true);
          }, error => {
            this.snackBar.open('Fail', 'Dismiss', {
              duration: 2000,
            });
          });
    };
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  authorList() {
    this.authorService.list()
        .subscribe((authors: any) => {
          this.authors = authors && authors.Items;
          this.events.publish('author-selected', false);
        });
  }

  unSelectAll() {
    this.authors.map(a => {
      delete a.selected;
      return a;
    });
  }

  authorSelected(author: any) {
    this.events.publish('author-selected', !author.selected && author);
    if (!author.selected) {
      this.unSelectAll();
    }
    author.selected = !author.selected;
  }
}
