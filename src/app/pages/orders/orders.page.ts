import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';

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

  constructor() { }

  ngOnInit() {
  }

}
