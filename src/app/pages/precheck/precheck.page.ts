import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-precheck',
  templateUrl: './precheck.page.html',
  styleUrls: ['./precheck.page.scss'],
})
export class PrecheckPage implements OnInit {
  user: user;
  truck: truck;
  base64Images: string[] = ["", "", "", ""];
  checkItemsPictureTaken: boolean[] = [false, false, false, false];

  forkImageTaken: boolean = false;

  constructor(private camera: Camera, public userService: UserService, public router: Router, private truckService: TruckService) { }

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
    console.log(this.truck);
  }


  goToOrders() {
    this.router.navigateByUrl("menu");
  }

}
