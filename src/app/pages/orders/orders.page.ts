import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AccelerometerService } from 'src/app/services/accelerometer.service';
import { TruckService } from 'src/app/services/truck.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {
  @ViewChild('mySlider', null) slides: IonSlides;
  listeningStarted: boolean;
  listeningStopped: boolean;
  x: string;
  y: string;
  z: string;
  id: any;
  timestamp: number;
  measurement: string;
  log_to_write: string;
  outputData: string;
  gra_x: number;
  gra_y: number;
  gra_z: number;
  alpha: number;
  startingIndex: number;
  tutorialChecked: boolean;

  swipeNext() {
    this.slides.slideNext();
  }

  constructor(private accelerometerService: AccelerometerService, private router: Router, private userService: UserService, private truckService: TruckService, private tutorialService: TutorialService, private alertController: AlertController) {

  }

  ngOnInit() {
    this.tutorialChecked = this.tutorialService.getServiceChecked();
    this.listeningStarted = this.accelerometerService.getListeningStarted();
    this.listeningStopped = this.accelerometerService.getListeningStopped();

    if (this.tutorialChecked) {
      this.presentTutorialAlert();
    }

  }

  startListening() {
    this.accelerometerService.startListening();
    this.listeningStarted = true;
    this.listeningStopped = false;
  }

  stopListening() {
    this.listeningStarted = false;
    this.listeningStopped = true;
    this.accelerometerService.stopListening();
  }

  logout() {
    console.log('entered logout');
    if (!this.listeningStopped) {
      this.accelerometerService.stopListening();
    }
    console.log('entered logout');
    this.router.navigateByUrl('login');
    this.userService.addTimeLog(new Date().getTime());
    if (this.truckService.getTruckScanned) {
      this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    }
    console.log('should have logged out');
  }

  async presentTutorialAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: 'scaledAlert',
      message: '<h6>Starting the Truck</h6> <img src="../../../assets/Daisy_Tutorial2.gif"/> <p style="font-size:small;">Video courtesy of Nissan</p <p>Once you have confirmed that it is safe to drive your Rocla forklift, please confirm that the select lever is placed in neutral position and the parking brake is set, as shown above. Then, insert the key into the keyswitch and start the engine. You may view your tasks above, alongside the current map of AGVs.</p>',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentEmergencyAlert() {
    const alert = await this.alertController.create({
      cssClass: 'emergencyAlert',
      message: '<ion-icon class="emergency" name="ios-warning"></ion-icon> <h6>Are you having an emergency?</h6> <p>If you do not select an option, an emergency call will be made</p>',
      buttons: ['Yes', 'No']
    });

    await alert.present();
  }


  async presentReportAlert() {
    const alert = await this.alertController.create({
      header: 'Report something',
      cssClass: 'scaledAlert',
      message: 'Please specify what you want to report',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          label: 'Problem description',
          placeholder: 'Problem description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
