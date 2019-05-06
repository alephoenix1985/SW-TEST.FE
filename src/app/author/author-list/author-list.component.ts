import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.sass']
})
export class AuthorListComponent implements OnInit {
  @Input() authors;
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();
  @Output('onSelect') onSelect = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  edit($event: any) {
    this.onEdit.emit($event);
  }

  delete($event: any) {
    this.onDelete.emit($event);
  }

  select($event: any) {
    this.onSelect.emit($event);
  }
}
