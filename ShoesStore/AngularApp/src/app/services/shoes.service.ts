import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Shoes } from '../models/shoes';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  currentShoes: Shoes;
  readonly baseURL = 'http://localhost:3000/shoes/';

  constructor(private http: HttpClient) { }

  GetList() {
    return this.http.get(this.baseURL);
  }
}
