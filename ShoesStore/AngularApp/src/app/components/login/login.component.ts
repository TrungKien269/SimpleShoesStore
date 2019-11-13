import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { Response } from '../../models/response';
import { from } from 'rxjs';
import {
  SocialLoginModule, SocialUser, GoogleLoginProvider, FacebookLoginProvider,
  AuthService
} from 'ng-social-login-module';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public accountService: AccountService, private route: Router,
    private socialAuthService: AuthService) { }

  errorStr: string;
  public user: any = SocialUser;

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
      facebook_id: '',
      google_id: '',
      type: 0,
      status: 1
    };
  }

  onSubmit(username: string, password: string) {
    this.accountService.Login(username, password).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        this.errorStr = response.message;
      }
      else {
        const type: Number = (response.obj as Account).type;
        if (type === 1) {
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate(['admin']);
        }
        else {
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate([sessionStorage.getItem('currenPage')]);
        }
      }
    });
  }

  SetAccount(username: string, password: string) {
    this.accountService.currentAccount.username = username;
    this.accountService.currentAccount.password = password;
  }
  // Code tuần 1

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.accountService.LoginWithFacebook(this.user.id).subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          this.errorStr = response.message;
        }
        else {
          console.log(response.obj as Account);
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate([sessionStorage.getItem('currenPage')]);
        }
      });
    });
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.accountService.LoginWithGoogle(this.user.id).subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          this.errorStr = response.message;
        }
        else {
          console.log(response.obj as Account);
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate([sessionStorage.getItem('currenPage')]);
        }
      });
    });
  }
  // Code tuần 2

}
