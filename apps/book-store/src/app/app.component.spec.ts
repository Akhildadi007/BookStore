import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { RoutingModule } from './routing/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { BookSearchComponent } from './book/book-search/book-search.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {SideNavListComponent} from './side-nav/side-nav-list/side-nav-list.component'
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        BookSearchComponent,
        SideNavComponent,
        SideNavListComponent,
        BookDetailsComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  test('should create the app', () => {
    expect(app).toBeTruthy();
  });

  test(`should have as title 'book-store'`, () => {
    expect(app.title).toEqual('book-store');
  });
});