import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

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

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

  logout(){
    this.router.navigateByUrl("login");
  }

}
