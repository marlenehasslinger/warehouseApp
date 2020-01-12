import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface truck {
  duration: number
  name: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})

export class TruckService {
  loginTime: number;
  truck: truck = {
    name: "",
    duration: 0,
    id: ""
  }

  constructor(private db: AngularFirestore) {
    this.truckCollection = db.collection<truck>('trucks');

  }
  private truckCollection: AngularFirestoreCollection<truck>;

  setTruck(id:string){
    this.truck.id = id;
    }

  getTruck(){
    return this.truck;
  }

  getTruckId(){
    return this.truck.id;
  }

  getTruckData(id: string){
    return this.truckCollection.doc<truck>(id).valueChanges();
    
  }

  updateTruckLog(time: number){
    let truck: truck;
    let id = this.getTruckId();
    this.getTruckData(id).subscribe(res => {
      truck = res;

      // calculate time difference between login and logout
      let differenceMs = time-this.loginTime;
      let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000) // minutes

      let newDuration = truck.duration + differenceMins;
      this.truckCollection.doc<truck>(id).update({ duration: newDuration });
    });

  }

  setLoginTime() {
    this.loginTime = new Date().getTime();

  }
}
