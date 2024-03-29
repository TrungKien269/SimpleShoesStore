import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  readonly baseURL = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  GetUserByAccount(account_id: string) {
    return this.http.get(this.baseURL + '/account/' + account_id);
  }

  CreateUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  UpdateUser(user: User, account_id: string) {
    return this.http.put(this.baseURL + account_id, user);
  }
}
