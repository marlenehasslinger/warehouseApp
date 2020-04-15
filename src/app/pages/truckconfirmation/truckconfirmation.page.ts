import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-truckconfirmation',
  templateUrl: './truckconfirmation.page.html',
  styleUrls: ['./truckconfirmation.page.scss'],
})
export class TruckconfirmationPage implements OnInit {
  truck: truck;
  user: user;
  tutorialChecked: boolean;

  constructor(public userService: UserService, public router: Router, private truckService: TruckService, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.truck = this.truckService.getTruck();
    this.tutorialChecked = this.tutorialService.getServiceChecked();

    if (this.tutorialChecked) {
      this.presentAlert();
    }

    console.log(this.truck);
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: 'scaledAlert',
      subHeader: 'Hi - I am Daisy, and I am here to help you.',
      message: 'Please use the following screen to confirm that we have registered you as driving the proper truck.',
      buttons: ['OK']
    });

    await alert.present();
  }


  goToPreCheck() {
    this.router.navigateByUrl('precheck');
  }

}
