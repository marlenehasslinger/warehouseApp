import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService, user } from 'src/app/services/user.service';
import { TruckService } from 'src/app/services/truck.service';
import { AccelerometerService } from 'src/app/services/accelerometer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user: user;
  pages = [
    {
      title: 'Orders',
      url: '/menu/orders'
    },
  ];

  managerPages = [
    {
      title: 'Orders',
      url: '/menu/orders'
    },
    {
      title: 'Collisions',
      url: '/menu/collisions'
    },
    {
      title: 'Drivers',
      url: '/menu/userlog'
    },
    {
      title: 'Trucks',
      url: '/menu/trucklog'
    },
  ];

  selectedPath = '';

  constructor(private accelerometerService: AccelerometerService, private router: Router, private userService: UserService, private truckService: TruckService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user.manager) {
      this.pages = this.managerPages;
    }
  }

  logout() {
    if (!this.accelerometerService.getListeningStopped()) {
      this.accelerometerService.stopListening();
    }

    this.userService.addTimeLog(new Date().getTime());
    if(this.truckService.getTruckScanned()) {
      this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    }
    this.userService.signOut();
    this.router.navigateByUrl('login');
  }

}
