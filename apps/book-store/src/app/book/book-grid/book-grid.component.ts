import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'my-book-shoping-store-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {
@Input() book;
  constructor() { }

  ngOnInit() {
  }

}
