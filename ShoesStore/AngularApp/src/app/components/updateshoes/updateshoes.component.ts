import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-updateshoes',
  templateUrl: './updateshoes.component.html',
  styleUrls: ['./updateshoes.component.css']
})
export class UpdateshoesComponent implements OnInit {

  constructor(public shoesService: ShoesService, private route: Router,
    public categoryService: CategoryService, public makerService: MakerService,
    public originService: OriginService, public supplierService: SupplierService,
    public colorService: ColorService, public sizeService: SizeService,
    public uploadService: UploadService, private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

  categoryList: Category[];
  makerList: Maker[];
  originList: Origin[];
  supplierList: Supplier[];
  sizeList: Size[];
  shoesPrice: number[];
  fileData: File;

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
      }
    });
  }

  initShoes() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoesService.GetShoes(id).subscribe((res) => {
      const response: Response = res as Response;
      this.shoesService.currentShoes = (response.obj) as Shoes;

      this.makerService.GetAll().subscribe((res) => {
        const response: Response = res as Response;
        this.makerList = response.obj as Maker[];
      });

      this.categoryService.GetAll().subscribe((res) => {
        const response: Response = res as Response;
        this.categoryList = response.obj as Category[];
      });

      this.originService.GetAll().subscribe((res) => {
        const response: Response = res as Response;
        this.originList = response.obj as Origin[];
      });

      this.supplierService.GetAll().subscribe((res) => {
        const response: Response = res as Response;
        this.supplierList = response.obj as Supplier[];
      });

    });
  }

  Logout() {
    sessionStorage.clear();
    sessionStorage.setItem('currentPage', '/');
    this.route.navigate(['/']);
  }

  OpenFile() {
    $('#imgFile').click();
    return false;
  }

  ClearFile() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    $('#blah').attr('src', 'http://localhost:3000/images/shoes/' + id + '.jpeg');
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    Swal.fire({
      title: 'Confirm',
      text: 'Do you want to update this shoes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        this.shoesService.UpdateShoes(id, this.shoesService.currentShoes).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            console.log(response.message);
            Swal.fire({
              title: 'Fail',
              text: response.message,
              icon: 'error'
            });
          }
          else {
            this.UploadImage(id);
            Swal.fire({
              title: 'Complete',
              text: 'Update this shoes successfully',
              icon: 'success'
            });
          }
        });
      }
    });
  }

  UploadImage(id: string) {
    if (this.fileData != null) {
      const formData = new FormData();
      const fileName = id + '.jpeg';
      formData.append('files', this.fileData, fileName);
      this.uploadService.UploadImage(formData).subscribe((event) => {
      });
    }
  }

}
