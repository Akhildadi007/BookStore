import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../../routing/routing.module';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { reducerMapper } from '../../reducers/mapper';
import { ChangeBooks } from '../../actions/book.actions';
import {BookSearchComponent} from '../book-search/book-search.component';
import { getSampleBook } from '../book-search/book-search.component.spec';

import { MaterialModule } from '../../material/material.module';
describe('BookDetailsComponent', () => {
  let comp: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

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
      declarations: [BookDetailsComponent, BookSearchComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({bookId: getSampleBook().id})
            }
          }
    }
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(BookDetailsComponent);

      comp = fixture.componentInstance;
    });
  }));
    
  test('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  test('should not contain bookDetail block initially', ()=>{
    expect( fixture.debugElement.query( By.css('.example-card') ) ).toBeFalsy();
  });

  test('should show book details', ()=>{
    comp.bookDetails = getSampleBook();

    comp.setSelectedBookId( comp.bookDetails.id );

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.example-card') ).nativeElement ).toBeTruthy();
  });

  test('should not show "add to cart / buy now" if already added book to cart', () => {
    comp.bookDetails = getSampleBook();

    comp.setSelectedBookId( comp.bookDetails.id );
    comp.setCartList( { ids: [ comp.bookDetails.id ] } );
    comp.checkItemExistsInCart();

    expect( comp.itemBought ).toBeTruthy();
  });

  test('should show "add to cart / buy now" if selected book not in cart', () => {
    comp.bookDetails = getSampleBook();

    comp.setSelectedBookId( 'randomId' );
    comp.checkItemExistsInCart();

    expect( comp.itemBought ).toBeFalsy();
  });

  test('should show "add to cart / buy now" if book removed from cart', () => {
    comp.bookDetails = getSampleBook();

    comp.setSelectedBookId( comp.bookDetails.id );

    comp.removeBookFromCart();

    expect( comp.itemBought ).toBeFalsy();
  });

  test('should show "remove" if user clicked on buy now button', () => {
    comp.bookDetails = getSampleBook();
    const router: Router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    comp.setSelectedBookId( comp.bookDetails.id );
    comp.setCartList( { ids: [ comp.bookDetails.id ] } );
    comp.buyNow();
    
    expect( comp.itemBought ).toBeTruthy();
    expect( navigateSpy ).toHaveBeenCalledWith( ['/cart'] );
  });

  test('should redirect to home if book details is null', () => {
    comp.bookDetails = null;

    const router: Router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    comp.ngOnInit();

    expect( navigateSpy ).toHaveBeenCalledWith(['/']);
  });

  test('should get book details from book list', () => {
    const sampleBook = getSampleBook();
    const booksAction = new ChangeBooks( [ sampleBook ] );
    comp.getStoreRef().dispatch( booksAction );
    comp.setSelectedBookId( sampleBook.id );
    comp.ngOnInit();

    expect( comp.bookDetails.id ).toBe( sampleBook.id );
  });
})