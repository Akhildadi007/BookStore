// Angular Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components used in routing
import { BookSearchComponent } from '../book/book-search/book-search.component';
import { BookDetailsComponent } from '../book/book-details/book-details.component';

// environment varibles 
import { environment } from './../../environments/environment';

// Apps main routes mapping
const routes: Routes = [
  {
    path: '',
    component: BookSearchComponent
  },
  {
    path: `bookdetails/:${environment.urlParams["bookdetails#"]}`,
    component: BookDetailsComponent
  },
  {
    path: 'cart',
    loadChildren: './../cart/cart.module#CartModule'
  },
  {
    path: 'mycollection',
    loadChildren: './../my-collection/my-collection.module#MyCollectionModule'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }