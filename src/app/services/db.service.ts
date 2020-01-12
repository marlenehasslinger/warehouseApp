import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { TruckService } from './truck.service';

export interface userData {
	firstname: string,
  lastname: string,
  pin: string
}

export interface timeLog {
	date: number,
  duration: number,

}

export interface truck {
  duration: number
  name: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private userCollection: AngularFirestoreCollection<userData>;
  private truckCollection: AngularFirestoreCollection<truck>;
  private timelogCollection: AngularFirestoreCollection<timeLog>;
  private timelogs: Observable<timeLog[]>;
  public loginTime:number;
  public userId:string;

  constructor(private db: AngularFirestore, public userService:UserService, public truckService: TruckService
    ) {
    this.userCollection = db.collection<userData>('users');
    this.truckCollection = db.collection<truck>('trucks');

  }

  // User data

  getUserData(id: string){
    // set login time for data aquisition
    this.setLoginTime(id);
    return this.userCollection.doc<userData>(id).valueChanges();
  }

  updateUserData(user:userData, id:string){
    return this.userCollection.doc(id).update(user);
  }

  // Time Logs

  getTimeLogs(id: string){
    this.timelogs = this.timelogCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })

    );
    
    console.log(this.timelogs);
    return this.timelogs;
  }

  addTimeLog(time: number) {
    // calculate time difference between login and logout
    let differenceMs = time-this.loginTime;
    let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000) // minutes

    let newtimeLog: timeLog = {
      date: time,
      duration: differenceMins
    }

    this.timelogCollection.add(newtimeLog);
  }

  setLoginTime(id: string) {
    this.loginTime = new Date().getTime();
    this.timelogCollection = this.userCollection.doc(id).collection<timeLog>('timelogs');

  }

  // Truck Data

  getTruckData(id: string){
    return this.truckCollection.doc<truck>(id).valueChanges();
    
  }

  updateTruckDuration(time: number){
    let truck: truck;
    let id = this.truckService.getTruckId();
    this.getTruckData(id).subscribe(res => {
      truck = res;

      // calculate time difference between login and logout
      let differenceMs = time-this.loginTime;
      let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000) // minutes

      let newDuration = truck.duration + differenceMins;
      this.truckCollection.doc<truck>(id).update({ duration: newDuration });
    });


  }

}
