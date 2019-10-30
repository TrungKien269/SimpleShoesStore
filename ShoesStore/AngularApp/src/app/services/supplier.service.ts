import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  currentSupplier: Supplier;
  readonly baseURL = 'http://localhost:3000/suppliers/';

  constructor(private http: HttpClient) { }

  GetSupplier(id: string) {
    return this.http.get(this.baseURL + id);
  }
}
