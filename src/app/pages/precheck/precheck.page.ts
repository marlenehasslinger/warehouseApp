import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

interface user {
	pin: string,
  uid: string,
  truck: string
}

@Component({
  selector: 'app-precheck',
  templateUrl: './precheck.page.html',
  styleUrls: ['./precheck.page.scss'],
})
export class PrecheckPage implements OnInit {
  user: user;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}
