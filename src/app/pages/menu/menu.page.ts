import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Orders',
      url: '/menu/orders'
    },
    {
      title: 'Employees',
      url: '/menu/userlog'
    },
    {
      title: 'Trucks',
      url: '/menu/trucklog'
    },
  ];

  selectedPath = '';

  constructor(private router: Router, private userService: UserService, private truckService: TruckService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

  logout(){
    console.log("entered logout");
    this.router.navigateByUrl("login");
    this.userService.addTimeLog(new Date().getTime());
    this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    console.log("should have logged out");
  }

}
