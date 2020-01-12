import { Component, OnInit } from '@angular/core';
import { user, userData, DbService } from '../../services/db.service';
import { Router } from '@angular/router';

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

  constructor(public dbService: DbService, public router: Router) { }

  ngOnInit() {
    this.user = this.dbService.getUser();
    this.dbService.getUserData(this.user.uid).subscribe(res => {
      this.userData = res;
    });
  }


  goToOrders() {
    console.log("gotoorders");
    this.router.navigateByUrl("menu");
  }

}
