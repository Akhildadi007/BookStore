import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import {Book} from '../models/book'

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http:HttpClient) { }
  private fetchBooksURL = environment.urlLinks.localhostBooksFetch;
  searchBooks(searchString:string): Observable<any> {
    return this.http.get<Book[]>( this.fetchBooksURL.replace("#", searchString) );
  }
}
