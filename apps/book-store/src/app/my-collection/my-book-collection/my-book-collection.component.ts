// Angular Component Classes
import { Component, OnInit, OnDestroy } from '@angular/core';

// Redux related imports
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCollectionItems } from '../../reducers/collection.reducer';

// Dev Models
import { Book } from '../../models/book';

@Component({
  selector: 'my-book-shoping-store-my-book-collection',
  templateUrl: './my-book-collection.component.html',
  styleUrls: ['./my-book-collection.component.css']
})
export class MyBookCollectionComponent implements OnInit, OnDestroy {
  // variable to show all user collections
  public collectionBooks: Book[];

  // Varible to store subscription of collection data
  private collectionSub: Subscription;

  constructor(private store: Store<{CollectionState}>) { }

  ngOnInit() {
    // Fetching collection details from store
    this.collectionSub = this.store.select( selectAllCollectionItems ).subscribe( ( collectionData ) => {
      this.collectionBooks = collectionData;      
    });
  }

  getStoreRef() {
    return this.store;
  }

  ngOnDestroy() {
    // UnSubscribing all redux sub
    if( this.collectionSub ){
      this.collectionSub.unsubscribe();
    }
  }

}
