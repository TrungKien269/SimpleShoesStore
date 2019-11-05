import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';

import { User } from '../../models/user';
import { Account } from '../../models/account';
import { Response } from '../../models/response';
import { isUndefined } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  session: string;
  response: Response;

  constructor(public userService: UserService, public accountService: AccountService,
    private route: Router) { }

  ngOnInit() {
    this.session = sessionStorage.getItem('account');
    this.userService.GetUserByAccount(this.session).subscribe((res) => {
      this.userService.currentUser = (res as Response).obj as User;
      console.log(this.userService.currentUser);
    });
  }

}
