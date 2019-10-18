import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { Response } from '../../models/response';
import { from } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public accountService: AccountService, private route: Router) { }
  errorStr: string;

  ngOnInit() {
    this.resetForm();
    $('#txtUserName').focus();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    // this.errorStr = '';
    this.accountService.currentAccount = {
      _id: null,
      username: '',
      password: '',
      type: 0,
      status: 1
    };
  }

  onSubmit(username: string, password: string) {
    this.accountService.Login(username, password).subscribe((res) => {
      var response: Response = res as Response;
      if(!response.status) {
        this.errorStr = response.message;
      }
      else {
        console.log(response.obj as Account);
      }
    });
  }

  SetAccount(username: string, password: string) {
    this.accountService.currentAccount.username = username;
    this.accountService.currentAccount.password = password;
  }
  // Code tuần 1
}
