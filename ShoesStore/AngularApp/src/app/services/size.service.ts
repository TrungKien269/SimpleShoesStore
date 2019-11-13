import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  currentSize: Size;
  readonly baseURL = 'http://localhost:3000/sizes/';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.baseURL);
  }

  GetMaker(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
