import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

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

  constructor(private router: Router, private dbService: DbService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

  logout(){
    this.dbService.addTimeLog(new Date().getTime());
    this.dbService.updateTruckDuration(new Date().getTime())
    this.router.navigateByUrl("login");

  }

}
