import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Origin } from '../models/origin';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  currentOrigin: Origin;
  readonly baseURL = 'http://localhost:3000/origins/';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.baseURL);
  }

  GetOrigin(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
