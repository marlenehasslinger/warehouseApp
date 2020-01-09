import { Injectable } from '@angular/core';

export interface User {
  name: string;
  role: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor() { }

  login(name: string, pw: string){
    if(name ==='admin' && pw === 'admin') {
      this.currentUser = {
        name: name,
        role: 0
      }
      return(true);
    } else if(name === 'user' && pw === "user") {
      this.currentUser = {
        name: name,
        role: 1
      }
      return(true);
    } else {
      return(false);
    }

  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  isAdmin() {
    return this.currentUser.role === 0;
  }

}
