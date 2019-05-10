import { Component, OnInit } from '@angular/core';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { PublicationService } from './publication.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import uh from '../../core/helpers/util.helper';
import { EventsService } from '../../core/services/events';
import { Author } from '../../core/models/author.model';
import { Publication } from '../../core/models/publication.model';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.sass']
})
export class PublicationComponent implements OnInit {
  pubs: any = {};
  optionList: { limit?: number; page?: number; order?: number, filters?: any };
  value: any;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private events: EventsService,
              private publicationService: PublicationService) {
    this.optionList = {order: 0, limit: 5, page: 0};
    this.events.subscribe('update-publication-list', () => {
      this.itemList();
    });
    this.events.subscribe('author-selected', (author) => {
      if (author && author.id) {
        this.optionList.filters = JSON.stringify({authorId: author.id});
        this.itemList();
      } else {
        delete this.optionList.filters;
        this.itemList();
      }
    });
  }

  itemList(optionList = this.optionList) {
    this.publicationService.list(optionList)
        .subscribe((pubs: any) => {
          if (pubs) {
            this.filter(pubs.Items);
          }
        });
  }

  ngOnInit() {
    this.itemList();
  }

  openPublication(item?): void {
    const dialogRef = this.dialog.open(PublicationFormComponent, {
      width: '300px'
    });
    const instance = dialogRef.componentInstance;
    instance.item = item ? new Publication(Object.assign({}, item) || {}) : new Publication();
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.state) {
        const message = 'The publication has been ' + result.state;
        this.snackBar.open(message, 'Ok', {
          duration: 2000,
        });
      }
    });
  }

  deletePublication(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px'
    });
    const instance: any = dialogRef.componentInstance;
    instance.message = 'Are you sure you want to edit this?';
    instance.title = 'Delete Publication';
    instance.labelNo = 'No';
    instance.labelYes = 'Yes';
    instance.onOk = () => {
      this.publicationService.delete(item)
          .subscribe(data => {
            const message = 'The publication has been deleted';
            this.snackBar.open(message, 'Ok', {
              duration: 2000,
            });
            dialogRef.close(data);
            this.itemList();
          }, error => {
            this.snackBar.open('Fail', 'Dismiss', {
              duration: 2000,
            });
          });
    };
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  currentPageItems() {
    return this.pubs && this.pubs.pages && this.pubs.pages.length && this.pubs.pages[this.optionList.page] || [];
  }

  listOrder(order) {
    this.optionList.page = 0;
    this.itemList();
    this.optionList.order = order;
  }

  search(text) {
    this.filter(this.pubs.values, text);
  }

  filter(items, text = '') {
    uh.paginator(items, text, this.optionList.order, this.optionList.limit)
        .then(paginated => {
          this.pubs = paginated;
          this.pubs.values = items;
        });
  }
}
