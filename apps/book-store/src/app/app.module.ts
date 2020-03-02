import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavListComponent } from './side-nav/side-nav-list/side-nav-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BookSearchComponent } from './book/book-search/book-search.component';
import { BookGridComponent } from './book/book-grid/book-grid.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { RoutingModule } from './routing/routing.module';

import { reducerMapper } from './reducers/mapper';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './effects/books.effects';

import { MaterialModule } from './material/material.module';

import { environment } from './../environments/environment.prod';


@NgModule({
  declarations: [AppComponent, SideNavComponent, SideNavListComponent, BookSearchComponent, BookGridComponent, BookDetailsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NoopAnimationsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducerMapper),
            EffectsModule.forRoot([BooksEffects]),
            environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
