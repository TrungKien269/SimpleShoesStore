import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { Response } from '../../models/response';

import { SocialLoginModule, SocialUser, GoogleLoginProvider, FacebookLoginProvider,
  AuthService } from 'ng-social-login-module';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public accountService: AccountService, private route: Router,
    public userService: UserService, private socialAuthService: AuthService) { }

    errorStr: string;
    confirm_password: string;
    user: any = SocialUser;

  ngOnInit() {
    this.resetForm();
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
    this.userService.currentUser = {
      _id: null,
      fullname: '',
      address: '',
      mobile_number: '',
      account_id: null
    };
  }

  onSubmit() {
    this.accountService.SignUp(this.accountService.currentAccount).subscribe((res) => {
      const response: Response = res as Response;
      if (!response.status) {
        this.errorStr = response.message;
      }
      else {
        console.log(response.obj as Account);
        this.userService.currentUser.account_id = (response.obj as Account)._id;
        sessionStorage.setItem('account', (response.obj as Account)._id);

        this.userService.CreateUser(this.userService.currentUser).subscribe((res) => {
          const response: Response = res as Response;
          if (!response.status) {
            this.errorStr = response.message;
          }
          else{
            this.route.navigate(['/']);
          }
        });
      }
    });
  }

  SignUpWithFaceBook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
      this.accountService.currentAccount.facebook_id = this.user.id;
      this.accountService.SignUp(this.accountService.currentAccount).subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          this.errorStr = response.message;
        }
        else {
          console.log(response.obj as Account);
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate(['/']);
        }
      });
    });
  }

  SignUpWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
      this.accountService.currentAccount.google_id = this.user.id;
      this.accountService.SignUp(this.accountService.currentAccount).subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          this.errorStr = response.message;
        }
        else {
          console.log(response.obj as Account);
          sessionStorage.setItem('account', (response.obj as Account)._id);
          this.route.navigate(['/']);
        }
      });
    });
  }

}
