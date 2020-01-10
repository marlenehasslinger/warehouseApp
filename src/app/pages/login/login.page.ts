import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  buttonPressed:boolean = false;
  employeeId = null;
  scannedCode = null;
  pinNotFound = false;

  constructor(public afAuth: AngularFireAuth, public formBuilder: FormBuilder, public barcodeScanner: BarcodeScanner, private router: Router) {
    this.myForm = this.formBuilder.group({
      pin: ['', Validators.required],
      });
  }

  get pin() {
    return this.myForm.get('pin');
  }

  async login(){
    this.buttonPressed = true;
    this.employeeId = this.myForm.value.pin;

    try {
      // kind of a hack
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.employeeId + "@testemail.com", "123456");
      if(res.user){
        this.pinNotFound = false;
        this.scanCode();
      }
    } catch(err) {
      this.pinNotFound = true;
      console.dir(err);
    }

  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
        if(!barcodeData.cancelled){
          this.router.navigateByUrl("precheck");
        }
      }
    );
  }

  ngOnInit() {
  }

}
