import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';

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

  constructor(public formBuilder: FormBuilder, public barcodeScanner: BarcodeScanner, private router: Router) {
    this.myForm = this.formBuilder.group({
      pin: ['', Validators.required],
      });
  }

  get pin() {
    return this.myForm.get('pin');
  }

  login(){
    this.buttonPressed = true;
    this.employeeId = this.myForm.value.pin;
    this.scanCode();
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
