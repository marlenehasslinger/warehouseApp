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

    if(this.tutorialChecked){
      this.presentAlertConfirm();
    }
    

    console.log(this.truck);
  }
  

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'This is the tutorial <3',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  goToPreCheck() {
    this.router.navigateByUrl("precheck");
  }

}
