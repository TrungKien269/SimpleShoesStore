import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import { Order } from '../../models/order';
import { OrderDetail } from '../../models/order-detail';
import { Response } from '../../models/response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private route: Router, public orderService: OrderService,
    public authService: AuthService) { }

  session: string;
  response: Response;
  orders: Order[];

  ngOnInit() {
    this.authService.validate().subscribe((res) => {
      const response: Response = res as Response;
      if (response.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: response.message
        }).then((result) => {
          sessionStorage.setItem('currentPage', '/history');
        this.route.navigate(['/login']);
        });
      }
      else {
        this.session = sessionStorage.getItem('account');
        this.orderService.GetOrders(this.session).subscribe((res) => {
          this.response = res as Response;
          this.orders = this.response.obj as Order[];
          // console.log(this.orders);
        });
      }
    });
  }
}
