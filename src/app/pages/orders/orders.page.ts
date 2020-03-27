import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild('mySlider', null)  slides: IonSlides;

  swipeNext(){
    this.slides.slideNext();
  }

  constructor(private router: Router, private userService: UserService, private truckService: TruckService) { }

  ngOnInit() { }

  logout(){
    console.log("entered logout");
    this.router.navigateByUrl("login");
    this.userService.addTimeLog(new Date().getTime());
    if(this.truckService.getTruckScanned){
      this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    }
    console.log("should have logged out");
  }

}
