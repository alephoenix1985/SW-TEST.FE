import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PublicationComponent } from './publication.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { PublicationListModule } from './publication-list/publication-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { AuthorFormModule } from '../author/author-form/author-form.module';
import { PublicationFormModule } from './publication-form/publication-form.module';

@NgModule({
  declarations: [
    PublicationComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    PublicationListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    AuthorFormModule,
    PublicationFormModule
  ],
  exports: [PublicationComponent],
  providers: []
})
export class PublicationModule {
}
