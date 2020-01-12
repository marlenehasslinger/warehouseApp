import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { user, UserService } from '../../services/user.service';
import { auth } from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  buttonPressed:boolean = false;
  employeePin: string = null;
  scannedCode: string = null;
  pinNotFound: boolean = false;
  user: user = {
    pin: "",
    uid: "",
    truck: ""
  };

  constructor(public userService: UserService,
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public barcodeScanner: BarcodeScanner,
    private router: Router,
    private loadingController: LoadingController,
    private truckService:TruckService) {
    this.myForm = this.formBuilder.group({
      pin: ['', Validators.required],
      });
  }

  get pin() {
    return this.myForm.get('pin');
  }

  async login(){
    this.buttonPressed = true;
    this.employeePin = this.myForm.value.pin;

    try {
      // kind of a hack
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.employeePin + "@testemail.com", "123456");
      if(res.user){
        this.pinNotFound = false;
        console.log(res.user.uid);
        this.user.uid = res.user.uid;
        this.user.pin = this.employeePin;

        // todo: delete the following later and enable code scan 
        this.user.truck = "truck1";
        this.truckService.setTruck(this.user.truck);
        this.userService.setUser(this.user);
        this.router.navigateByUrl("precheck");
        
        // uncomment to activate code scan
        // this.scanCode();
      }
    } catch(err) {
      this.pinNotFound = true;
      console.dir(err);
    }

  }

  async scanCode() {
    let loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
        if(!barcodeData.cancelled){
          this.user.truck = this.scannedCode;
          this.truckService.setTruck(this.user.truck);
          this.userService.setUser(this.user);
          loading.dismiss();
          this.myForm.reset();
          this.router.navigateByUrl("precheck");
        }
        loading.dismiss();
      }
    );
  }


  ngOnInit() {
  }

  goToTutorial(){
    this.router.navigateByUrl("tutorial");
  }

}
