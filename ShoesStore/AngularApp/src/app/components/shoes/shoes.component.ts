import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShoesService } from '../../services/shoes.service';
import { Shoes } from '../../models/shoes';
import { Response } from '../../models/response';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  constructor(public shoesService: ShoesService, private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoesService.GetShoes(id).subscribe((res) => {
      let response: Response = res as Response;
      console.log((response.obj) as Shoes);
    });
  }

}
