import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../models/order';
import { OrderDetail } from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly baseURL = 'http://localhost:3000/orders/';

  constructor(private http: HttpClient) { }

  CreateOrder(order: Order) {
    return this.http.post(this.baseURL, order);
  }

  CreateOrderDetail(orderDetail: OrderDetail) {
    return this.http.post(this.baseURL + '/details', orderDetail);
  }

  GetOrders(account_id: string) {
    return this.http.get(this.baseURL + account_id);
  }

  SendEmail(email: string, orderID: string) {
    return this.http.post(this.baseURL + '/sendMail', {
      email: email,
      orderID: orderID
    });
  }
}
