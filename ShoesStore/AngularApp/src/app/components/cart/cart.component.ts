import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderDetail } from '../../models/order-detail';
import { Response } from '../../models/response';
import { HttpErrorResponse } from '@angular/common/http';

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
  emailConfirm = '';

  constructor(public cartService: CartService, private route: Router,
    public orderService: OrderService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.validate().subscribe((res) => {
      const response: Response = res as Response;
      if (response.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: response.message
        }).then((result) => {
          sessionStorage.setItem('currentPage', '/cart');
          this.route.navigate(['/login']);
        });
      }
      else {
        this.session = sessionStorage.getItem('account');
        this.cartService.GetCart(this.session).subscribe((res) => {
          this.response = res as Response;
          this.shoesArr = this.response.obj as any[];
          if (this.shoesArr.length === 0) {
            this.total = 0;
          }
          else {
            this.total = this.shoesArr.reduce((sum, current) =>
              sum + (parseInt(current.quantity) *
                parseInt(current.shoes_id.shoes_prices[1])), 0);
          }
        });
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
    Swal.fire({
      title: 'Confirm',
      text: "Do you want to remove this shose?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.shoesArr = this.shoesArr.filter(shoes => shoes.shoes_id._id !== shoes_id);
        this.total = this.shoesArr.reduce((sum, current) =>
          sum + (parseInt(current.quantity) * parseInt(current.shoes_id.shoes_prices[1])),
          0);

        this.cartService.RemoveShoes(this.session, shoes_id).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            Swal.fire({
              icon: 'error',
              title: 'Fail',
              text: response.message
            });
          }
          else {
            Swal.fire({
              title: 'Complete',
              text: response.message,
              icon: 'success'
            });
          }
        });
      }
    });
  }

  ValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  BuyShoes() {
    if ($('#cfEmail').val() === '' || $('#cfEmail').val() === null) {
      Swal.fire({
        icon: 'error',
        title: 'Fail',
        text: 'You have to fill email to confirm order!'
      }).then(() => {
        $('#cfEmail').focus();
      });
    }
    else if(!this.ValidateEmail($('#cfEmail').val())) {
      Swal.fire({
        icon: 'error',
        title: 'Fail',
        text: 'Your email is not a correct format!'
      }).then(() => {
        $('#cfEmail').focus();
      });
    }
    else if (this.shoesArr.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Fail',
        text: 'You have to choose at least one product!'
      }).then(() => {
        $('#cfEmail').focus();
      });
    }
    else {
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
            Swal.fire({
              icon: 'error',
              title: 'Fail',
              text: response.message
            });
          }
          else {
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
                Swal.fire({
                  icon: 'error',
                  title: 'Fail',
                  text: response.message
                });
              }
              else {
                const orderID = response.obj._id;
                this.cartService.RemoveAll(this.session).subscribe((res) => {
                  const response: Response = res as Response;
                  if (!response.status) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Fail',
                      text: response.message
                    });
                  }
                  else {
                    Swal.fire({
                      title: 'Complete',
                      text: 'Buy successfully',
                      icon: 'success'
                    }).then((result) => {
                      this.shoesArr = [];
                      this.orderService.SendEmail($('#cfEmail').val(), orderID)
                      .subscribe((res) => {
                        const response: Response = res as Response;
                        if (!response.status) {
                          console.log(response);
                          Swal.fire({
                            icon: 'error',
                            title: 'Fail',
                            text: response.message
                          });
                        }
                        else {
                          Swal.fire({
                            title: 'Complete',
                            text: 'You can check this email to receive notification!',
                            icon: 'success'
                          });
                        }
                      });
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
  }
}
