import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { ShoesService } from '../../services/shoes.service';
import { CategoryService } from '../../services/category.service';
import { MakerService } from '../../services/maker.service';
import { OriginService } from '../../services/origin.service';
import { SupplierService } from '../../services/supplier.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from '../../services/size.service';
import { UploadService } from '../../services/upload.service';
import { AuthService } from '../../services/auth.service';

import { Shoes } from '../../models/shoes';
import { Response } from '../../models/response';

import * as $ from 'jquery';
import { Category } from 'src/app/models/category';
import { Maker } from 'src/app/models/maker';
import { Origin } from 'src/app/models/origin';
import { Supplier } from 'src/app/models/supplier';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createshoes',
  templateUrl: './createshoes.component.html',
  styleUrls: ['./createshoes.component.css']
})
export class CreateshoesComponent implements OnInit {

  categoryList: Category[];
  makerList: Maker[];
  originList: Origin[];
  supplierList: Supplier[];
  colorList: Color[];
  sizeList: Size[];
  shoesPrice: number[];
  fileData: File;

  constructor(private route: Router, public shoesService: ShoesService,
    public categoryService: CategoryService, public makerService: MakerService,
    public originService: OriginService, public supplierService: SupplierService,
    public colorService: ColorService, public sizeService: SizeService,
    public uploadService: UploadService, public authService: AuthService) { }

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
        this.initShoes();
        this.GetAllCategory();
        this.GetAllMaker();
        this.GetAllOrigin();
        this.GetAllSupplier();
        this.GetAllColor();
        this.GetAllSize();
      }
    });
  }

  initShoes() {
    this.shoesService.currentShoes = {
      _id: null,
      category_id: '',
      designer: '',
      maker_id: '',
      name: '',
      origin_id: '',
      release_date: '',
      shoes_colors: [],
      shoes_sizes: [],
      shoes_prices: [],
      status: 1
    };
  }

  GetAllCategory() {
    this.categoryService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.categoryList = response.obj as Category[];
      // console.log(this.categoryList);
    });
  }

  GetAllMaker() {
    this.makerService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.makerList = response.obj as Maker[];
      // console.log(this.makerList);
    });
  }

  GetAllOrigin() {
    this.originService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.originList = response.obj as Origin[];
      // console.log(this.originList);
    });
  }

  GetAllSupplier() {
    this.supplierService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.supplierList = response.obj as Supplier[];
      // console.log(this.supplierList);
    });
  }

  GetAllColor() {
    this.colorService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.colorList = response.obj as Color[];
      // console.log(this.colorList);
    });
  }

  GetAllSize() {
    this.sizeService.GetAll().subscribe((res) => {
      const response: Response = res as Response;
      this.sizeList = response.obj as Size[];
      // console.log(this.sizeList);
    });
  }

  OpenFile() {
    $('#imgFile').click();
    return false;
  }

  ClearFile() {
    $('#blah').attr('src', '../../../assets/images/default-avatar.png');
    return false;
  }

  onChange(e: any) {
    let url = '';
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        url = event.target.result;
        $('#blah').attr('src', url);
        this.fileData = e.target.files[0];
      };
    }
  }

  onSubmit() {
    this.shoesService.CreateShoes(this.shoesService.currentShoes).subscribe((res) => {
      const response: Response = res as Response;
      if (response.status) {
        this.UploadImage((response.obj as Shoes)._id);
        alert('Create Successfully');
        this.initShoes();
      }
      else {
        alert(response.message);
        console.log(response);
      }
    });
  }

  UploadImage(id: string) {
    const formData = new FormData();
    const fileName = id + '.' + this.fileData.name.split('.')[1];
    formData.append('files', this.fileData, fileName);
    this.uploadService.UploadImage(formData).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
      $('#blah').attr('src', '../../../assets/images/default-avatar.png');
    });
  }

}
