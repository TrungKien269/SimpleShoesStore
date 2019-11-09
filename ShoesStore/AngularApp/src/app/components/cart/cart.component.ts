import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderDetail } from '../../models/order-detail';
import { Response } from '../../models/response';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  session: string;
  response: Response;
  shoesArr: any[];
  errorStr: string;
  total: number;
  order: Order;

  constructor(public cartService: CartService, private route: Router,
    public orderService: OrderService) { }

  ngOnInit() {
    this.session = sessionStorage.getItem('account');
    this.cartService.GetCart(this.session).subscribe((res) => {
      this.response = res as Response;
      this.shoesArr = this.response.obj as any[];
      if (this.shoesArr.length === 0) {
        this.total = 0;
      }
      else {
        this.total = this.shoesArr.reduce((sum, current) =>
          sum + (parseInt(current.quantity) * parseInt(current.shoes_id.shoes_prices[1])),
          0);
      }
    });
  }

  onChange(e, shoes_id: string) {
    const currentInput = $(e).attr('target');
    const quantity = $(currentInput).val();
    this.shoesArr.filter(x => x.shoes_id._id === shoes_id)[0].quantity =
      parseInt(quantity);
    this.total = this.shoesArr.reduce((sum, current) =>
      sum + (parseInt(current.quantity) * parseInt(current.shoes_id.shoes_prices[1])),
      0);

    this.cartService.EditQuantity(this.session, shoes_id, quantity).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert(response.message);
      }
    });
  }

  RemoveShoes(shoes_id: string) {
    this.shoesArr = this.shoesArr.filter(shoes => shoes.shoes_id._id !== shoes_id);
    this.total = this.shoesArr.reduce((sum, current) =>
      sum + (parseInt(current.quantity) * parseInt(current.shoes_id.shoes_prices[1])),
      0);

    this.cartService.RemoveShoes(this.session, shoes_id).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert(response.message);
      }
    });
  }

  BuyShoes() {
    const detailID: string[] = [];
    this.shoesArr.forEach((cart, index) => {
      const orderDetail: OrderDetail = {
        _id: cart._id,
        shoes_id: cart.shoes_id._id,
        quantity: cart.quantity
      };
      detailID.push(cart._id);
      this.orderService.CreateOrderDetail(orderDetail).subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          alert(response.message);
        }
      });
    });

    const today = new Date();
    this.order = {
      _id: null,
      account_id: this.session,
      datetime: today.getDate() + '/' + (today.getMonth() + 1) + '/'
      + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':'
      + today.getSeconds(),
      total: this.total,
      details: detailID
    };
    this.orderService.CreateOrder(this.order).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert(response.message);
      }
    });

    this.cartService.RemoveAll(this.session).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert(response.message);
      }
      else {
        alert('Buy successfully');
      }
    });
  }

}
