import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentAccount: Account;
  readonly baseURL = 'http://localhost:3000/accounts/';

  constructor(private http: HttpClient) { }

  Login(username: string, password: string) {
    return this.http.post(this.baseURL + 'login', {
      username: username,
      password: password
    });
  }
  // Code tuần 1

  LoginWithFacebook(facebook_id: string) {
    return this.http.post(this.baseURL + 'social/facebook', {
      facebook_id: facebook_id
    });
  }

  LoginWithGoogle(google_id: string) {
    return this.http.post(this.baseURL + 'social/google', {
      google_id: google_id
    });
  }

  Logout() {
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('currenPage');
  }
}
