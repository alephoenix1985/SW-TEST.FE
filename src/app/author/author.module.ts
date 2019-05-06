import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthorComponent } from './author.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorListItemComponent } from './author-list/author-list-item/author-list-item.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AuthorFormModule } from './author-form/author-form.module';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';

@NgModule({
  declarations: [
    AuthorComponent,
    AuthorListComponent,
    AuthorListItemComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    AuthorFormModule
  ],
  exports: [AuthorComponent],
  providers: [TruncatePipe]
})
export class AuthorModule {
}
