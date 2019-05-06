import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationModule } from './publication/publication.module';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { AuthorModule } from './author/author.module';
import { EventsModule } from '../core/services/events';

@NgModule({
    declarations: [
        AppComponent,
        ConfirmComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthorModule,
        AppRoutingModule,
        PublicationModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        EventsModule.forRoot()
    ],
    entryComponents: [ConfirmComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
