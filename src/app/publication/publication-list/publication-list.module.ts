import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { PublicationListComponent } from './publication-list.component';
import { PublicationItemModule } from './publication-item/publication-item.module';

@NgModule({
  declarations: [
    PublicationListComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    PublicationItemModule
  ],
  exports: [PublicationListComponent],
  providers: []
})
export class PublicationListModule {
}
