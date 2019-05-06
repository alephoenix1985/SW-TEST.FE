import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthorFormComponent } from './author-form.component';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthorFormComponent
  ],
  entryComponents: [AuthorFormComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [AuthorFormComponent],
  providers: []
})
export class AuthorFormModule {
}
