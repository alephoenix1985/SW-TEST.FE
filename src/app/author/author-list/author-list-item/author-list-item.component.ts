import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from '../../../../core/models/author.model';
import { Publication } from '../../../../core/models/publication.model';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.sass']
})
export class AuthorListItemComponent implements OnInit {
  @Input() author: Author;
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();
  @Output('onSelect') onSelect = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  edit(author: Author) {
    this.onEdit.emit(author);
  }

  delete(author: Author) {
    this.onDelete.emit(author);
  }

  select(author: Author) {
    this.onSelect.emit(author);
  }
}
