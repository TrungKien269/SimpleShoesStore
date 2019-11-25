import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { AccountService } from '../../services/account.service';
import { Shoes } from '../../models/shoes';

import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ListShoes: Shoes[];
  session: string;

  constructor(public shoesService: ShoesService, private route: Router,
    public accountService: AccountService) { }

  ngOnInit() {
    const accountType = sessionStorage.getItem('accountType');
    if (accountType !== null && accountType === '1') {
      sessionStorage.setItem('currentPage', '/admin');
      this.route.navigate(['/admin']);
    }
    else{
      this.shoesService.GetList().subscribe((res) => {
        this.ListShoes = res as Shoes[];
        this.session = sessionStorage.getItem('account');
        sessionStorage.setItem('currentPage', '/');
      });
    }
  }

  GetSellingShoes() {
    return this.ListShoes.filter(shoes => shoes.status === 1);
  }

  Logout() {
    this.accountService.Logout();
    this.session = null;
  }

  Cart(e: any) {
    e.preventDefault();
    sessionStorage.setItem('currentPage', '/cart');
    this.route.navigate(['/cart']);
    // if(this.session === null) {
    //   sessionStorage.setItem('currenPage', '/cart');
    //   this.route.navigate(['/login']);
    // }
    // else {
    //   this.route.navigate(['/cart']);
    // }
  }

  Profile(e: any) {
    e.preventDefault();
    sessionStorage.setItem('currentPage', '/profile');
    this.route.navigate(['/profile']);
    // if(this.session === null) {
    //   sessionStorage.setItem('currenPage', '/profile');
    //   this.route.navigate(['/login']);
    // }
    // else {
    //   this.route.navigate(['/profile']);
    // }
  }

  History(e: any) {
    e.preventDefault();
    sessionStorage.setItem('currentPage', '/history');
    this.route.navigate(['/history']);
    // if(this.session === null) {
    //   sessionStorage.setItem('currenPage', '/history');
    //   this.route.navigate(['/login']);
    // }
    // else {
    //   this.route.navigate(['/history']);
    // }
  }
}
