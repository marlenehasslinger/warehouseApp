import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { HTTP } from '@ionic-native/http/ngx';

const headers = { 'Authorization': 'Token AML0PF2bP6vI49uSsEPA01cj7QEsA5D2M2WHB_sW9iRyVENNqwjquofPeqHcjLJLHusYABT43TldbTW1ecc68g==' };
const url = 'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/write?org=1d952de0da8a8fe4&bucket=Rocla&precision=ms';


@Injectable({
  providedIn: 'root'
})
export class AccelerometerService {

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

  constructor(public deviceMotion: DeviceMotion, private http: HTTP) {
    this.x = '-';
    this.y = '-';
    this.z = '-';
    this.outputData = '';
    this.alpha = 0.8;
    this.gra_x = 0;
    this.gra_y = 0;
    this.gra_z = 0;
    this.listeningStarted = false;
    this.listeningStopped = true;
    // Use user-defined name of the measurement if it is provided otherwise name the file by 'acceleration'
    // Measurement is an important concept in InfluxDB. It can be considered as the table name.
    this.measurement = 'acceleration';

  }

  async startListening() {
    this.listeningStarted = true;
    this.listeningStopped = false;

    console.log('-----------BEGIN LISTENING-----------');
    var option: DeviceMotionAccelerometerOptions = {
      //This is the polling frequency. It is measured in ms.
      //However, the data is not polling exactly in the defined frequency.
      //The actual sampling frequency will be lower than the defined frequency due to the delay.
      frequency: 50
    };

    this.startingIndex = 0;
    console.log('Starting index: ' + this.startingIndex);
    this.id = this.deviceMotion.watchAcceleration(option).subscribe((acceleration: DeviceMotionAccelerationData) => {

      // Use low pass filter to get the value of gravity in 3 axises and remove them from the value.
      // This method is recommended of Google Official Document: https://developer.android.com/reference/android/hardware/SensorEvent.html
      this.gra_x = this.alpha * this.gra_x + (1 - this.alpha) * acceleration.x;
      this.gra_y = this.alpha * this.gra_y + (1 - this.alpha) * acceleration.y;
      this.gra_z = this.alpha * this.gra_z + (1 - this.alpha) * acceleration.z;

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
        this.http.post(url, this.outputData, headers)
          .then(() => {
            console.log('Finish sending data: ' + Date.now());
          })
          .catch(error => {
            console.log(error);
          })
        // Reset the index and buffer.
        this.startingIndex = 0
        this.outputData = '';
      }

    }
    );
  }

  stopListening() {
    this.listeningStarted = false;
    this.listeningStopped = true;
    this.id.unsubscribe();

    console.log('-----------STOP LISTENING-----------');

    if (this.outputData) {
      this.http.setHeader('*', 'Content-Type', 'plain/text');
      this.http.setDataSerializer('utf8');
      console.log('Sending data: ' + Date.now());
      this.http.post(url, this.outputData, headers)
        .then(() => {
          console.log('Finish sending data: ' + Date.now())
          this.startingIndex = 0;
          this.outputData = '';
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  setListeningStarted(started: boolean) {
    this.listeningStarted = started;
  }

  setListeningStopped(stopped: boolean) {
    this.listeningStopped = stopped;
  }

  getListeningStarted() {
    return this.listeningStarted;
  }

  getListeningStopped() {
    return this.listeningStopped;
  }

}