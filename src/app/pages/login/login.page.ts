import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { user, UserService } from 'src/app/services/user.service';
import { auth } from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { TruckService } from 'src/app/services/truck.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { format } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  buttonPressed: boolean = false;
  employeePin: string = null;
  scannedCode: string = null;
  pinNotFound: boolean = false;
  uid: string;
  public form =
    { tutorialChecked: false,
      scanTruckChecked: true }
    ;

  constructor(public userService: UserService,
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public barcodeScanner: BarcodeScanner,
    private router: Router,
    private loadingController: LoadingController,
    private truckService: TruckService,
    private tutorialService: TutorialService) {
    this.myForm = this.formBuilder.group({
      pin: ['', Validators.required],
    });
  }

  get pin() {
    return this.myForm.get('pin');
  }

  async login() {
    this.buttonPressed = true;
    this.employeePin = this.myForm.value.pin;

    try {
      // password 123456 is hardcoded so that it won't be requested on the loging page
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.employeePin + "@testemail.com", "123456");
      if (res.user) {
        this.pinNotFound = false;
        this.uid = res.user.uid;

        if(!this.form.scanTruckChecked){
          /*this.truckService.getTruckData("truck1").subscribe(res => {
            this.truckService.setTruck(res);
          })
          this.truckService.setLoginTime();
          */
          this.userService.setLoginTime();
          this.userService.getUserData(this.uid).subscribe(res => {
            this.userService.setUser(res);
            this.tutorialService.setServiceChecked(this.form.tutorialChecked)
            if(this.userService.getUser().manager){
              this.router.navigateByUrl("menu");
            } else {
              this.router.navigateByUrl("orders");
            }
            
          });
        } else {
          this.truckService.setTruckScanned(this.form.scanTruckChecked);
          
          // delete 
          this.truckService.getTruckData("truck1").subscribe(res => {
            this.truckService.setTruck(res);
          })
          this.truckService.setLoginTime();

          this.userService.setLoginTime();
          this.userService.getUserData(this.uid).subscribe(res => {
            this.userService.setUser(res);
            this.tutorialService.setServiceChecked(this.form.tutorialChecked)
            this.router.navigateByUrl("truckconfirmation");
          });
          // until here
          //this.scanCode();

        }
      }
    } catch (err) {
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
        if (!barcodeData.cancelled) {
          this.truckService.getTruckData(this.scannedCode).subscribe(res => {
            this.truckService.setTruck(res);
          });
          loading.dismiss();
          this.myForm.reset();
          this.userService.setLoginTime();
          this.truckService.setLoginTime();
          this.tutorialService.setServiceChecked(this.form.tutorialChecked)
          this.userService.getUserData(this.uid).subscribe(res => {
            this.userService.setUser(res);
            this.router.navigateByUrl("truckconfirmation");
          });
        }
        loading.dismiss();
      }
    );
  }


  ngOnInit() {
  }

  goToTutorial() {
    this.router.navigateByUrl("tutorial");
  }

}
