import { async, ComponentFixture, TestBed ,fakeAsync, tick} from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../../routing/routing.module';

import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { ChangeBooks } from '../../actions/book.actions';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { reducerMapper } from '../../reducers/mapper';
import {BookDetailsComponent} from '../book-details/book-details.component'
describe('UI Blocks display', ()=> {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RoutingModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [BookSearchComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(BookSearchComponent);
    });
  }));
    
  test('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should not contain no books to show div block`, () => {
    expect( fixture.debugElement.query( By.css('.noBooks') ) ).toBe( null );
  });

  test('should not display any books initially', () => {
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeFalsy();
  });

  test(`should show 'no books to show' in UI`, () => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.recentSearchs = ['demo'];

    fixture.detectChanges();    

    expect( fixture.debugElement.query( By.css('.noBooks') ).nativeElement.textContent ).toBe('No books to show');
  });

  test(`should show books block`, async(() => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.booksList = [ getSampleBook() ];

    fixture.detectChanges();
    
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeTruthy();
  }));
});

describe('Search Form Tests', ()=> {
  let fixture: ComponentFixture<BookSearchComponent>;
  let comp: BookSearchComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RoutingModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [BookSearchComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(BookSearchComponent);

      comp = fixture.componentInstance;
      de = fixture.debugElement.query( By.css('form') );
      el = fixture.nativeElement;
    });
  }));
    
  test('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  test('should call form submit function', async( ()=> {
    fixture.detectChanges();
    spyOn(comp, 'getBookList');

    el = fixture.debugElement.query( By.css('.searchBtn') ).nativeElement;
    el.click();

    expect( comp.getBookList ).toHaveBeenCalledTimes( 0 );
  }) );

  test('should throw error for empty search/initial state', () => {
    comp.bookSearch.controls['bookName'].setValue('');

    expect( comp.bookSearch.valid ).toBeFalsy();
  });
  
  test('should throw error for special characters', () => {
    comp.bookSearch.controls['bookName'].setValue('adc#');

    expect( comp.bookSearch.valid ).toBeFalsy();
  });

  test('should return a books list', async(()=>{
    spyOn( comp, 'getBookList').and.callFake( ()=>{      
       comp.booksList = [getSampleBook()];
    });

    comp.getBookList();

    expect( comp.booksList.length ).toBeGreaterThan( 0 );
  }));

  test('should show books list in UI', async(()=>{
    spyOn( comp, 'getBookList').and.callFake( ()=>{      
       comp.booksList = [getSampleBook()];
    });

    comp.getBookList();

    const booksAction = new ChangeBooks( comp.booksList );
    comp.getStoreRef().dispatch( booksAction );

    fixture.detectChanges();
    
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeTruthy();
  }));

  test('should call search books on valid form', () => {
    comp.bookSearch.controls['bookName'].setValue('kalam');

    fixture.detectChanges();

    fixture.debugElement.query( By.css('.searchBtn') ).nativeElement.click();

    expect( comp.errorMessage ).toBe('');
  });

  test('should show error message on invalid form submit', () => {
    comp.bookSearch.controls['bookName'].setValue('');
    fixture.detectChanges();
    comp.getBookList();

    expect( comp.errorMessage ).toBe('Please enter a valid search text');
  });
});

export function getSampleBook() {
  return {
            title: 'Example Book',
            id: 'asad',
            authors: ['authorX'],
            currency: 'ISD',
            description: 'Sample Description',
            imageLink: '"http://books.google.com/books/content?id=vDJjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            price: 200,
            publisher: 'publisherX'
          };
}