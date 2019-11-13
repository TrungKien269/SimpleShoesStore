import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { Shoes } from '../../models/shoes';
import { Response } from '../../models/response';

import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ListShoes: Shoes[];
  session: string;

  constructor(public shoesService: ShoesService, private route: Router) { }

  ngOnInit() {
    this.shoesService.GetList().subscribe((res) => {
      this.ListShoes = res as Shoes[];
      this.session = sessionStorage.getItem('account');
      console.log(this.session);
    });
  }

  Logout() {
    sessionStorage.removeItem('account');
    this.session = null;
  }

}
