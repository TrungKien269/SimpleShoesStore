import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { Shoes } from '../../models/shoes';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ListShoes: Shoes[];

  constructor(public shoesService: ShoesService, private route: Router) { }

  ngOnInit() {
    this.shoesService.GetList().subscribe((res) => {
      this.ListShoes = res as Shoes[];
      console.log(this.ListShoes);
    });
  }
  // Code tuần 1
}
