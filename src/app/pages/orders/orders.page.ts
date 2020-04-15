import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TruckService } from 'src/app/services/truck.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { HTTP } from '@ionic-native/http/ngx';

const headers = { Authorization: 'Token AML0PF2bP6vI49uSsEPA01cj7QEsA5D2M2WHB_sW9iRyVENNqwjquofPeqHcjLJLHusYABT43TldbTW1ecc68g==' };
const url = 'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/write?org=1d952de0da8a8fe4&bucket=Rocla&precision=ms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {
  @ViewChild('mySlider', null) slides: IonSlides;
  public form = {
    listeningStarted: false,
    listeningStopped: true
  };
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

  constructor(public deviceMotion: DeviceMotion, private http: HTTP, private router: Router, private userService: UserService, private truckService: TruckService, private tutorialService: TutorialService, private alertController: AlertController) {
    this.x = '-';
    this.y = '-';
    this.z = '-';
    this.outputData = '';
    this.alpha = 0.8;
    this.gra_x = 0;
    this.gra_y = 0;
    this.gra_z = 0;
    this.measurement = 'acceleration';

  }

  ngOnInit() {
    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if (this.tutorialChecked) {
      this.presentAlert();
    }
  }

  async startListening() {
    this.form.listeningStarted = true;
    this.form.listeningStopped = false;
    // There is a bug when pressing the startListening button twice.
    // So we use variable listeningFlag to know if startListening is pressed before.
    // If so, we exit the function otherwise we proceed.
    console.log('-----------BEGIN LISTENING-----------');
    const option: DeviceMotionAccelerometerOptions = {
      // This is the polling frequency. It is measured in ms.
      // However, the data is not polling exactly in the defined frequency.
      // The actual sampling frequency will be lower than the defined frequency due to the delay.
      frequency: 50
    };

    // Use user-defined name of the measurement if it is provided otherwise name the file by "acceleration"
    // Measurement is an important concept in InfluxDB. It can be considered as the table name.

    this.startingIndex = 0;
    console.log('Starting index: ' + this.startingIndex);
    this.id = this.deviceMotion.watchAcceleration(option).subscribe((acceleration: DeviceMotionAccelerationData) => {

      // Use low pass filter to get the value of gravity in 3 axises and remove them from the value.
      // This method is recommended of Google Official Document: https://developer.android.com/reference/android/hardware/SensorEvent.html
      this.gra_x = this.alpha * this.gra_x + (1 - this.alpha) * acceleration.x;
      this.gra_y = this.alpha * this.gra_y + (1 - this.alpha) * acceleration.y;
      this.gra_z = this.alpha * this.gra_z + (1 - this.alpha) * acceleration.z;
      // console.log('gravity: '+this.gra_x +' '+this.gra_y+' '+this.gra_z );

      this.x = '' + (acceleration.x - this.gra_x).toFixed(4);
      this.y = '' + (acceleration.y - this.gra_y).toFixed(4);
      this.z = '' + (acceleration.z - this.gra_z).toFixed(4);
      this.timestamp = acceleration.timestamp.toFixed(0);

      // One sample of the acceleration data to be sent to the influxdb. It follows the InfluxDB line protocol syntax:
      // https://docs.influxdata.com/influxdb/v1.7/write_protocols/line_protocol_tutorial/
      this.log_to_write = String(this.measurement + ',device=Android ' + 'x=' + this.x + ',y=' + this.y + ',z=' + this.z + ' ' + this.timestamp + '\n'); // Line protocol string
      // Here we use variable outputData as a buffer to store the samples which will be sent to influxdb in the future.
      // In this way, we can achieve batch update and it can reduce the pressure brought by frequent http requests
      this.outputData += this.log_to_write;
      // We are counting the index of the samples, when it reachs a limit, the samples will be sent to the influxdb cloud in a batch.
      this.startingIndex += 1;

      // Write the data to the influxDB in a batch style with 100 records. We can also set the limit higher such as 200 or more.
      // If the sampling period is 50ms, we send the data to influxdb every 5 second.
      // issaveData is a flag to indicate if we want to send the data to influxDB or now.
      if (this.startingIndex >= 5) {
        // We need send the data in plain text .
        this.http.setHeader('*', 'Content-Type', 'plain/text');
        this.http.setDataSerializer('utf8');

        console.log('Sending data: ' + Date.now());
        // console.log('test');
        this.http.post(url, this.outputData, headers)
          .then(() => {
            console.log('Finish sending data: ' + Date.now());
          })
          .catch(error => {
            console.log(error);
          });
        // Reset the index and buffer.
        this.startingIndex = 0;
        this.outputData = '';
      }

    }
    );
  }

  stopListening() {
    this.form.listeningStarted = false;
    this.form.listeningStopped = true;
    this.id.unsubscribe();
    console.log('-----------STOP LISTENING-----------');
    // If users presses the 'Stop Listening' button, we stop listening and flush the data from the buffer to influxdb.
    if (this.outputData) {
      this.http.setHeader('*', 'Content-Type', 'plain/text');
      this.http.setDataSerializer('utf8');
      console.log('Sending data: ' + Date.now());
      this.http.post(url, this.outputData, headers)
        .then(() => {
          console.log('Finish sending data: ' + Date.now());
          this.startingIndex = 0;
          this.outputData = '';
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  logout() {
    console.log('entered logout');
    if (!this.form.listeningStopped) {
      this.stopListening();
    }
    console.log('entered logout');
    this.router.navigateByUrl('login');
    this.userService.addTimeLog(new Date().getTime());
    if (this.truckService.getTruckScanned) {
      this.truckService.addTruckLog(this.userService.getUser(), new Date().getTime());
    }
    console.log('should have logged out');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: 'scaledAlert',
      message: '<h6>Starting the Truck</h6> <img src="../../../assets/Daisy_Tutorial2.gif"/> <p style="font-size:small;">Video courtesy of Nissan</p <p>Once you have confirmed that it is safe to drive your Rocla forklift, please confirm that the select lever is placed in neutral position and the parking brake is set, as shown above. Then, insert the key into the keyswitch and start the engine. You may view your tasks above, alongside the current map of AGVs.</p>',
      buttons: ['OK']
    });

    await alert.present();
  }

}
