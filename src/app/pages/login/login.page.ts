import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { user, UserService } from 'src/app/services/user.service';
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
  uid: string;

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
        this.uid = res.user.uid;

        // todo: just to skip code scan - delete the following later and enable code scan
        this.truckService.setTruck("truck1");

        this.userService.getUserData(this.uid).subscribe(res => {
          this.userService.setUser(res);
          this.router.navigateByUrl("precheck");
        });
        
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
          this.truckService.setTruck(this.scannedCode);
          loading.dismiss();
          this.myForm.reset();
          this.userService.getUserData(this.uid).subscribe(res => {
            this.userService.setUser(res);
            this.router.navigateByUrl("precheck");
          });
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
