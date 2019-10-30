import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  currentCategory: Category;
  readonly baseURL = 'http://localhost:3000/categories/';

  constructor(private http: HttpClient) { }

  GetCategory(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
