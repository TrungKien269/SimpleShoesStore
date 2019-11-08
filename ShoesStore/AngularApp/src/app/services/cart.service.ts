import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentAccount_ID: string;
  currentShoes_ID: string;
  currentCart: Cart;
  readonly baseURL = 'http://localhost:3000/carts/';

  constructor(private http: HttpClient) { }

  GetCart(account_id: string) {
    return this.http.get(this.baseURL + account_id);
  }

  EditQuantity(account_id: string, shoes_id: string, quantity: string) {
    return this.http.put(this.baseURL + account_id + '/' + shoes_id, {
      quantity: quantity
    });
  }

  RemoveShoes(account_id: string, shoes_id: string){
    return this.http.delete(this.baseURL + account_id + '/' + shoes_id);
  }
}
