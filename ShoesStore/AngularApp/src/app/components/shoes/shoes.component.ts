import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { CategoryService } from '../../services/category.service';
import { MakerService } from '../../services/maker.service';
import { OriginService } from '../../services/origin.service';
import { SupplierService } from '../../services/supplier.service';


import { Shoes } from '../../models/shoes';
import { Category } from '../../models/category';
import { Maker } from '../../models/maker';
import { Origin } from '../../models/origin';
import { Supplier } from '../../models/supplier';
import { Response } from '../../models/response';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  constructor(public shoesService: ShoesService, private route: Router,
    private activatedRoute: ActivatedRoute, public categoryService: CategoryService,
    public makerService: MakerService, public originService: OriginService,
    public supplierService: SupplierService) { }

  response: Response;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoesService.GetShoes(id).subscribe((res) => {
      this.response = res as Response;
      this.shoesService.currentShoes = (this.response.obj) as Shoes;
      console.log(this.shoesService.currentShoes);

      this.categoryService.GetCategory(this.shoesService.currentShoes.category_id)
        .subscribe((res) => {
          const cate_Response = res as Response;
          this.categoryService.currentCategory = (cate_Response.obj) as Category;
          console.log(this.categoryService.currentCategory);

          this.makerService.GetMaker(this.shoesService.currentShoes.maker_id)
          .subscribe((res) => {
            const maker_Response = res as Response;
            this.makerService.currentMaker = (maker_Response.obj) as Maker;
            console.log(this.makerService.currentMaker);
          });

          this.originService.GetCategory(this.shoesService.currentShoes.origin_id)
          .subscribe((res) => {
            const origin_Response = res as Response;
            this.originService.currentOrigin = (origin_Response.obj) as Origin;
            console.log(this.originService.currentOrigin);
          });
        });
    });

  }

}
