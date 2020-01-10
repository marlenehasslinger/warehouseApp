import { Component, OnInit } from '@angular/core';
import { user, UserService } from '../../services/user.service';
import { userData, DbService } from '../../services/db.service';

@Component({
  selector: 'app-precheck',
  templateUrl: './precheck.page.html',
  styleUrls: ['./precheck.page.scss'],
})
export class PrecheckPage implements OnInit {
  user: user;
  userData: userData = {
    firstname: "",
    lastname: "",
    pin: ""
  }

  constructor(public userService: UserService, public dbService: DbService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user.uid);
    this.dbService.getUserData(this.user.uid).subscribe(res => {
      this.userData = res;
      console.log(this.userData);
    });
  }

}
