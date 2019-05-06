import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Publication } from '../../../../core/models/publication.model';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.sass']
})
export class PublicationItemComponent implements OnInit {
  @Input() author: Publication;
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  edit(item: Publication) {
    this.onEdit.emit(item);
  }

  delete(item: Publication) {
    this.onDelete.emit(item);
  }
}
