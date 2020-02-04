import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';

@Component({
  selector: 'app-truckconfirmation',
  templateUrl: './truckconfirmation.page.html',
  styleUrls: ['./truckconfirmation.page.scss'],
})
export class TruckconfirmationPage implements OnInit {
  truck: truck;
  user: user;

  constructor(public userService: UserService, public router: Router, private truckService: TruckService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.truck = this.truckService.getTruck();
    console.log(this.truck);
  }


  goToPreCheck() {
    this.router.navigateByUrl("precheck");
  }

}
