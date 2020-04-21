import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { user } from './user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface truck {
  duration: number;
  name: string;
  id: string;
}

export interface truckTimeLog {
  date: number;
  duration: number;
  driver: string;

}

@Injectable({
  providedIn: 'root'
})

export class TruckService {
  private loginTime: number;
  private trucks: Observable<truck[]>;
  private truckCollection: AngularFirestoreCollection<truck>;
  private timelogCollection: AngularFirestoreCollection<truckTimeLog>;
  private truck: truck;
  private timelogs: Observable<truckTimeLog[]>;
  private truckScanned: boolean = false;
  // For search bar functionality
  private searchResults: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.truckCollection = db.collection<truck>('trucks');
  }

  setTruckScanned(truckScanned: boolean) {
    this.truckScanned = truckScanned;
  }

  getTruckScanned() {
    return this.truckScanned;
  }


  setTruck(truck: truck) {
    this.truck = truck;
  }

  getTruck() {
    return this.truck;
  }

  getTruckId() {
    return this.truck.id;
  }

  getSearchResults(): any {
    return this.searchResults;
  }

  getTruckData(id: string) {
    // Set timelog collection
    this.timelogCollection = this.truckCollection.doc(id).collection<truckTimeLog>('timelogs');

    return this.truckCollection.doc<truck>(id).valueChanges();
  }

  addTruckLog(user: user, time: number) {
    if (user) {
      let truck: truck;
      const id = this.getTruckId();
      const driverName = user.firstname + ' ' + user.lastname;
      // calculate time difference between login and logout
      const differenceMs = time - this.loginTime;
      let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000); // minutes
      differenceMins == 0 ? differenceMins = 1 : differenceMins = differenceMins;

      const newTrucktimeLog: truckTimeLog = {
        date: time,
        duration: differenceMins,
        driver: driverName
      };
      console.log('timelog in minutes: ' + differenceMins);

      this.timelogCollection.add(newTrucktimeLog);

      this.getTruckData(id).subscribe(res => {
        truck = res;
        const newDuration = truck.duration + differenceMins;
        this.truckCollection.doc(id).update({ duration: newDuration });
      });
    }

  }

  getAllTrucks() {
    this.trucks = this.truckCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })

    );
    return this.trucks;
  }

  getTrucksWithFirstLetter(firstLetter: string) {
    this.searchResults = this.db.collection('trucks', ref => ref.where('searchIndex', '==', firstLetter)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data:any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.searchResults;
  }

  getTruckLogs(id: string) {
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


  setLoginTime() {
    this.loginTime = new Date().getTime();
    console.log('set logintime' + this.loginTime);
  }
}
