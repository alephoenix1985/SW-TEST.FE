import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { PublicationItemComponent } from './publication-item.component';

@NgModule({
  declarations: [
    PublicationItemComponent
  ],
    imports: [
        BrowserModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
    ],
  exports: [PublicationItemComponent],
  providers: []
})
export class PublicationItemModule {
}
