import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-precheck',
  templateUrl: './precheck.page.html',
  styleUrls: ['./precheck.page.scss'],
})
export class PrecheckPage implements OnInit {
  user: user;
  truck: truck;
  tutorialChecked: boolean;
  base64Images: string[] = ["", "", "", ""];
  checkItemsPictureTaken: boolean[] = [false, false, false, false];

  forkImageTaken: boolean = false;

  constructor(private camera: Camera, public userService: UserService, public router: Router, private truckService: TruckService, private tutorialService: TutorialService, private alertController: AlertController) { }
    
    takePicture(position){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64Images[position] = 'data:image/jpeg;base64,' + imageData;
        this.checkItemsPictureTaken[position] = true;

        }, (err) => {
        // Handle error
        });
    }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.truck = this.truckService.getTruck();
    this.tutorialChecked = this.tutorialService.getServiceChecked();
    console.log(this.truck);

    if(this.tutorialChecked){
      this.presentAlert();
    }
  }


  goToOrders() {
    if(this.user.manager){
      this.router.navigateByUrl("menu");
    } else {
      this.router.navigateByUrl("orders");
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: "scaledAlert",
      message: '<img src="../../../assets/Daisy_Tutorial1.gif"/> <p>Now that you have confirmed your truck, please complete the truck pre-check in order to ensure that various features of the truck are in proper working order. </p>',
      buttons: ['OK']
    });

    await alert.present();
  }

}
