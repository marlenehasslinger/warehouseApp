import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TruckService } from 'src/app/services/truck.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild('mySlider', null)  slides: IonSlides;
  tutorialChecked: boolean;

  swipeNext(){
    this.slides.slideNext();
  }

  constructor(private router: Router, private userService: UserService, private truckService: TruckService, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() { 
    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if(this.tutorialChecked){
      this.presentAlert();
    }
  }

  logout(){
    console.log("entered logout");
    this.router.navigateByUrl("login");
    this.userService.addTimeLog(new Date().getTime());
    if(this.truckService.getTruckScanned){
      this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    }
    console.log("should have logged out");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: "scaledAlert",
      message: '<h6>Starting the Truck</h6> <img src="../../../assets/Daisy_Tutorial2.gif"/> <p style="font-size:small;">Video courtesy of Nissan</p <p>Once you have confirmed that it is safe to drive your Rocla forklift, please confirm that the select lever is placed in neutral position and the parking brake is set, as shown above. Then, insert the key into the keyswitch and start the engine. You may view your tasks above, alongside the current map of AGVs.</p>',
      buttons: ['OK']
    });

    await alert.present();
  }



}
