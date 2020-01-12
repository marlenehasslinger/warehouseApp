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
      title: 'Time Log',
      url: '/menu/timelog'
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
    this.userService.addTimeLog(new Date().getTime());
    this.truckService.updateTruckLog(new Date().getTime())
    this.router.navigateByUrl("login");

  }

}
