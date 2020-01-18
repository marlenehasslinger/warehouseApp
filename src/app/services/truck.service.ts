import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { user } from './user.service';

export interface truck {
  duration: number
  name: string,
  id: string
}

export interface truckTimeLog {
  date: number,
  duration: number,
  driver: string

}

@Injectable({
  providedIn: 'root'
})

export class TruckService {
  loginTime: number;
  private truckCollection: AngularFirestoreCollection<truck>;
  private timelogCollection: AngularFirestoreCollection<truckTimeLog>;
  truck: truck = {
    name: "",
    duration: 0,
    id: ""
  }

  constructor(private db: AngularFirestore) {
    this.truckCollection = db.collection<truck>('trucks');
  }


  setTruck(id: string) {
    this.truck.id = id;
    this.timelogCollection = this.truckCollection.doc(id).collection<truckTimeLog>('timelogs');

  }

  getTruck() {
    return this.truck;
  }

  getTruckId() {
    return this.truck.id;
  }

  getTruckData(id: string) {
    return this.truckCollection.doc<truck>(id).valueChanges();

  }

  addTruckLog(user: user, time: number) {
    if(user){
      let truck: truck;
    let id = this.getTruckId();
    let driverName = user.firstname + " " + user.lastname;
    // calculate time difference between login and logout
    console.log("loginTime: " + this.loginTime);
    let differenceMs = time - this.loginTime;
    let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000); // minutes

    let newTrucktimeLog: truckTimeLog = {
      date: time,
      duration: differenceMins,
      driver: driverName
    }
    console.log("individual timelog: " + differenceMins);

    this.timelogCollection.add(newTrucktimeLog);


    this.getTruckData(id).subscribe(res => {
      truck = res;
      let newDuration = truck.duration + differenceMins;
      console.log("general duration: " + newDuration);
      this.truckCollection.doc(id).update({ duration: newDuration });
    });
    }

  }

  /*
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
*/
  setLoginTime() {
    this.loginTime = new Date().getTime();
    console.log("set logintime" + this.loginTime);
  }
}
