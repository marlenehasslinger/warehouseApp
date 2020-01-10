import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';

interface user {
	pin: string,
  uid: string,
  truck: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user

  constructor(public afAuth: AngularFireAuth) {

  }

  setUser(user: user) {
    this.user = user;
  }

  getUID(): string {
		return this.user.uid
  }

  getPIN(): string {
		return this.user.pin;
  }
  
  getUser(): user {
    return this.user;
  }

  
}
