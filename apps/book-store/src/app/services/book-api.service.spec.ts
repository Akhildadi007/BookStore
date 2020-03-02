
import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { BookApiService } from './book-api.service';

describe('BooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
  }));

  test('should be created', () => {
    const service: BookApiService = TestBed.get(BookApiService);
    expect(service).toBeTruthy();
  });
});