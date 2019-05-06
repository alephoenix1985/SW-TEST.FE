import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { AuthorService } from '../../author/author.service';
import { AuthorFormComponent } from '../../author/author-form/author-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventsService } from '../../../core/services/events';
import { Author } from '../../../core/models/author.model';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.sass']
})
export class PublicationFormComponent implements OnInit {
  item: any = {};
  authors;
  now;

  constructor(public dialog: MatDialog,
              private publicationService: PublicationService,
              private authorService: AuthorService,
              private events: EventsService,
              public dialogRef: MatDialogRef<any>) {
  }

  ngOnInit() {
    this.authorList();
    const now = this.item.publishedAt ? new Date(this.item.publishedAt) : new Date();
    const strDate = new Date(now.setTime(now.getTime() - now.getTimezoneOffset() * 60000)).toISOString();
    this.now = strDate.substr(0, 19);
    this.item.publishedAt = this.item.publishedAt || now.toISOString();
  }

  isValid() {
    return this.item && this.item.title && this.item.title.length &&
        this.item.body && this.item.body.length &&
        this.item.publishedAt &&
        this.item.author && this.item.author.id;
  }

  authorList() {
    this.authorService.list()
        .subscribe((authors: any) => {
          this.authors = authors && authors.Items;
          const preAuthor = this.item && this.item.author;
          this.item.author = this.authors && this.authors.find(a => a.id === preAuthor && preAuthor.id) || this.authors && this.authors[0];
        });
  }

  closeDialog(result) {
    this.dialogRef.close(result);
  }

  onSave(item) {
    this.publicationService.save(item)
        .subscribe(itemSaved => {
          this.events.publish('update-publication-list', true);
          this.closeDialog({publication: itemSaved, state: item.id ? 'updated' : 'created'});
        });
  }

  addAuthor(authorSelector?, author?) {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '400px'
    });
    const instance = dialogRef.componentInstance;
    instance.author = author ? new Author(Object.assign({}, author) || {}) : new Author();
    authorSelector.disabled = true;
    dialogRef.afterOpened().subscribe(result => {
      authorSelector.disabled = false;
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.state) {
        this.authorList();
      }
    });
  }

  onDateChanged(e: any) {
    const date = new Date(e.target.value + 'Z');
    const d = new Date(date.setTime(date.getTime() + date.getTimezoneOffset() * 60000)).toISOString();
    this.item.publishedAt = d;
  }
}
