import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
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

  constructor(public cartService: CartService, private route: Router) { }

  ngOnInit() {
    this.session = sessionStorage.getItem('account');
    this.cartService.GetCart(this.session).subscribe((res) => {
      this.response = res as Response;
      this.shoesArr = this.response.obj as any[];
      // console.log(this.shoesArr);
    });
  }

  onChange(e, shoes_id: string) {
    const currentInput = $(e).attr('target');
    const quantity = $(currentInput).val();
    this.cartService.EditQuantity(this.session, shoes_id, quantity).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert('Success');
      } else {
        alert(response.message);
      }
    });
  }

  RemoveShoes(shoes_id: string) {
    this.shoesArr = this.shoesArr.filter(shoes => shoes.shoes_id._id === shoes_id);
    this.cartService.RemoveShoes(this.session, shoes_id).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        alert(response.message);
      } else {
        alert('Success');
        this.shoesArr = this.shoesArr.filter(shoes => shoes.shoes_id._id === shoes_id);
      }
    });
  }

}
