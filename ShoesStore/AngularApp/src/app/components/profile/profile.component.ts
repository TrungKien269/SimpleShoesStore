import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';
import { Account } from '../../models/account';
import { Response } from '../../models/response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  session: string;
  response: Response;
  errorStr: string;

  constructor(public userService: UserService, public accountService: AccountService,
    private route: Router, public authService: AuthService) { }

  ngOnInit() {
    this.authService.validate().subscribe((res) => {
      const response: Response = res as Response;
      if (response.status === false) {
        alert(response.message);
        sessionStorage.setItem('currentPage', '/profile');
        this.route.navigate(['/login']);
      }
      else {
        this.resetForm();
        this.session = sessionStorage.getItem('account');
        this.userService.GetUserByAccount(this.session).subscribe((res) => {
          this.userService.currentUser = (res as Response).obj as User;
          // console.log(this.userService.currentUser);
        });
      }
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.userService.currentUser = {
      _id: null,
      fullname: '',
      mobile_number: '',
      address: '',
      account_id: null
    };
  }

  onSubmit() {
    this.userService.UpdateUser(this.userService.currentUser,
      this.userService.currentUser.account_id)
      .subscribe((res) => {
        const response: Response = res as Response;
        if (!response.status) {
          this.errorStr = response.message;
        }
        else {
          alert(response.message);
        }
      });
  }

  Logout() {
    this.accountService.Logout();
    this.session = undefined;
  }
}
