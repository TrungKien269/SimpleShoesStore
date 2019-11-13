import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  currentColor: Color;
  readonly baseURL = 'http://localhost:3000/colors/';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.baseURL);
  }

  GetMaker(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
