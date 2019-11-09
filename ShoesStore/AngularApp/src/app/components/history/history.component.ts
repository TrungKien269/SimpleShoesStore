import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';
import { OrderDetail } from '../../models/order-detail';
import { Response } from '../../models/response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private route: Router, public orderService: OrderService) { }

  session: string;
  response: Response;
  orders: Order[];

  ngOnInit() {
    this.session = sessionStorage.getItem('account');
    this.orderService.GetOrders(this.session).subscribe((res) => {
      this.response = res as Response;
      this.orders = this.response.obj as Order[];
      console.log(this.orders);
    });
  }


}
