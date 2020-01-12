import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precheck',
  templateUrl: './precheck.page.html',
  styleUrls: ['./precheck.page.scss'],
})
export class PrecheckPage implements OnInit {
  user: user = {
    firstname: "",
    lastname: "",
    pin: "",
    uid: ""
  }

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }


  goToOrders() {
    this.router.navigateByUrl("menu");
  }

}
