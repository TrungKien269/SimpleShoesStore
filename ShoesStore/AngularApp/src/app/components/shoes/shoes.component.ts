import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { CartService } from '../../services/cart.service';

import { Shoes } from '../../models/shoes';
import { Cart } from '../../models/cart';
import { Response } from '../../models/response';

import * as $ from 'jquery';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  constructor(public shoesService: ShoesService, private route: Router,
    private activatedRoute: ActivatedRoute, public cartService: CartService) { }

  response: Response;
  session: string;

  ngOnInit() {
    this.session = sessionStorage.getItem('account');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoesService.GetShoes(id).subscribe((res) => {
      this.response = res as Response;
      this.shoesService.currentShoes = (this.response.obj) as Shoes;
      console.log(this.shoesService.currentShoes);
    });
  }

  SelectShoes(e: any) {
    e.preventDefault();
    if (this.session === null) {
      sessionStorage.setItem('currenPage', '/shoes/' +
      this.activatedRoute.snapshot.paramMap.get('id'));
      this.route.navigate(['/login']);
    }
    else {
      this.cartService.AddToCart(this.session,
        this.activatedRoute.snapshot.paramMap.get('id')).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            alert(response.message);
          } else {
            alert('Add this shoes to cart successfully');
          }
        });
    }
  }

  Cart(e: any) {
    e.preventDefault();
    if(this.session === null) {
      sessionStorage.setItem('currenPage', '/cart');
      this.route.navigate(['/login']);
    }
    else {
      this.route.navigate(['/cart']);
    }
  }

  Profile(e: any) {
    e.preventDefault();
    if(this.session === null) {
      sessionStorage.setItem('currenPage', '/profile');
      this.route.navigate(['/login']);
    }
    else {
      this.route.navigate(['/profile']);
    }
  }

  History(e: any) {
    e.preventDefault();
    if(this.session === null) {
      sessionStorage.setItem('currenPage', '/history');
      this.route.navigate(['/login']);
    }
    else {
      this.route.navigate(['/history']);
    }
  }

}
