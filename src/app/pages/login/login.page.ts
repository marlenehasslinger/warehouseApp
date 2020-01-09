import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  buttonPressed:boolean = false;
  employee = {
    pin: ""
  };

  constructor(public formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      pin: ['', Validators.required],
      });
  }

  get pin() {
    return this.myForm.get('pin');
  }

  login(){
    this.buttonPressed = true;
  }

  ngOnInit() {
  }

}
