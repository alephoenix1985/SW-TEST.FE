import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.sass']
})
export class PublicationListComponent implements OnInit {
  @Input() items;
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();

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
}
