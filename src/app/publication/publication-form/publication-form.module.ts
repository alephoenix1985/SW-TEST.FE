import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PublicationFormComponent } from './publication-form.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PublicationFormComponent
  ],
  entryComponents: [PublicationFormComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: []
})
export class PublicationFormModule {
}
