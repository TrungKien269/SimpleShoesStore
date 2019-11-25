import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { AuthService } from '../../services/auth.service';
import { Shoes } from '../../models/shoes';
import { Response } from '../../models/response';
import Swal from 'sweetalert2';

import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ListShoes: Shoes[];
  session: string;

  constructor(public shoesService: ShoesService, private route: Router,
    public authService: AuthService) { }

  ngOnInit() {
    this.authService.validate().subscribe((res) => {
      const response: Response = res as Response;
      if (response.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: response.message
        }).then((result) => {
          this.route.navigate(['/login']);
        });
      }
      else {
        this.shoesService.GetList().subscribe((res) => {
          this.ListShoes = res as Shoes[];
          this.session = sessionStorage.getItem('account');
        });
      }
    });
  }

  Logout() {
    sessionStorage.clear();
    sessionStorage.setItem('currentPage', '/');
    this.session = null;
    this.route.navigate(['/']);
  }

}
