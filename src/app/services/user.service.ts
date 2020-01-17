import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TruckService } from './truck.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface timeLog {
  date: number,
  duration: number,

}

export interface user {
  firstname: string,
  lastname: string,
  pin: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: user;
  private userCollection: AngularFirestoreCollection<user>;
  private timelogCollection: AngularFirestoreCollection<timeLog>;
  private timelogs: Observable<timeLog[]>;
  private loginTime: number;
  private users:Observable<user[]>;

  constructor(private db: AngularFirestore, public truckService: TruckService, public afAuth: AngularFireAuth) {
    this.userCollection = db.collection<user>('users');

  }

  // User data


  setUser(user: user) {
    this.user = user;
  }

  getUID(): string {
    return this.user.uid;
  }

  getPIN(): string {
    return this.user.pin;
  }

  getUser(): user {
    return this.user;
  }

  getUserData(id: string) {
    //Initialize timelogCollection here because id is needed, which couldnt be provided in constructor
    this.timelogCollection = this.userCollection.doc(id).collection<timeLog>('timelogs');

    return this.userCollection.doc<user>(id).valueChanges();
  }

  updateUserData(user: user, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  getAllUsers() {
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })

    );

    return this.users;
  }

  // Time Logs
  getTimeLogs(id: string) {
    this.timelogs = this.timelogCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })

    );

    console.log(this.timelogs);
    return this.timelogs;
  }

  addTimeLog(time: number) {
    // calculate time difference between login and logout
    let differenceMs = time - this.loginTime;
    console.log("logintime from user service: " + this.loginTime);
    let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000) // minutes

    let newtimeLog: timeLog = {
      date: time,
      duration: differenceMins
    }

    this.timelogCollection.add(newtimeLog);
  }

  setLoginTime() {
    this.loginTime = new Date().getTime();
  }

}
