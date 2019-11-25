import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { ShoesService } from '../../services/shoes.service';

import { Shoes } from '../../models/shoes';
import { Response } from '../../models/response';

import * as $ from 'jquery';

@Component({
  selector: 'app-editshoes',
  templateUrl: './editshoes.component.html',
  styleUrls: ['./editshoes.component.css']
})
export class EditshoesComponent implements OnInit {

  constructor(public shoesService: ShoesService, private route: Router,
    private activatedRoute: ActivatedRoute) { }

  response: Response;
  session: string;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoesService.GetShoes(id).subscribe((res) => {
      this.response = res as Response;
      this.shoesService.currentShoes = (this.response.obj) as Shoes;
    });
  }

  DeleteShoes(e: any) {
    e.preventDefault();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    Swal.fire({
      title: 'Confirm',
      text: 'Do you want to remove this shoes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.shoesService.DeleteShoes(id).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            Swal.fire({
              title: 'Fail',
              text: response.message,
              icon: 'error'
            });
          } else {
            Swal.fire({
              title: 'Complete',
              text: 'Remove this shoes successfully',
              icon: 'success'
            }).then((result) => {
              this.shoesService.currentShoes.status = 0;
            });
          }
        });
      }
    });
  }

  ActivateShoes(e: any) {
    e.preventDefault();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    Swal.fire({
      title: 'Confirm',
      text: 'Do you want to activate this shoes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!'
    }).then((result) => {
      if (result.value) {
        this.shoesService.ActivateShoes(id).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            Swal.fire({
              title: 'Fail',
              text: response.message,
              icon: 'error'
            });
          } else {
            Swal.fire({
              title: 'Complete',
              text: 'Activate this shoes successfully',
              icon: 'success'
            }).then((result) => {
              this.shoesService.currentShoes.status = 1;
            });
          }
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
