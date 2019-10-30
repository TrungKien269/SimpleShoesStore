import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Maker } from '../models/maker';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  currentMaker: Maker;
  readonly baseURL = 'http://localhost:3000/makers/';

  constructor(private http: HttpClient) { }

  GetMaker(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
