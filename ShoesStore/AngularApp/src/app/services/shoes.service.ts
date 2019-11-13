import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Shoes } from '../models/shoes';
import { Observable } from 'rxjs';

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

  GetShoes(id: string) {
    return this.http.get(this.baseURL + id);
  }

  CreateShoes(shoes: Shoes) {
    return this.http.post(this.baseURL, shoes);
  }
}
