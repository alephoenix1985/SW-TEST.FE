import { Component, OnInit } from '@angular/core';
import { Author } from '../../../core/models/author.model';
import { AuthorService } from '../author.service';
import { MatDialogRef } from '@angular/material';
import { EventsService } from '../../../core/services/events';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.sass']
})
export class AuthorFormComponent implements OnInit {
  author: Author | any = {};
  result: any;

  constructor(private authorService: AuthorService,
              private events: EventsService,
              public dialogRef: MatDialogRef<any>) {
  }

  ngOnInit() {
  }

  isValid() {
    return this.author.validate.isValid;
  }

  onNoClick() {

  }

  closeDialog(result) {
    this.dialogRef.close(result);
  }

  onSave(author: Author) {
    this.authorService.save(author)
        .subscribe(authorSaved => {
          this.events.publish('update-author-list', true);
          this.closeDialog({author: authorSaved, state: author.id ? 'created' : 'updated'});
        });
  }
}
