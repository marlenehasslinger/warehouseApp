import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

export interface userData {
	firstname: string,
  lastname: string,
  pin: string
}

export interface timeLog {
	date: number,
  duration: number
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private userCollection: AngularFirestoreCollection<userData>;
  private timelogCollection: AngularFirestoreCollection<timeLog>;
  private timelogs: Observable<timeLog[]>;
  public loginTime:number;
  public userId:string;

  constructor(public db: AngularFirestore, public userService:UserService) {
    this.userCollection = db.collection<userData>('users');

  }

  getUserData(id: string){
    this.setLoginTime();
    this.timelogCollection = this.userCollection.doc(id).collection<timeLog>('timelogs');
    return this.userCollection.doc<userData>(id).valueChanges();
  }

  updateUserData(user:userData, id:string){
    return this.userCollection.doc(id).update(user);
  }

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
    let differenceMs = time-this.loginTime;
    let differenceMins = Math.round(((differenceMs % 86400000) % 3600000) / 60000) // minutes
    let newtimeLog: timeLog = {
      date: time,
      duration: differenceMins
    }
    return this.timelogCollection.add(newtimeLog);
  }

  setLoginTime() {
    this.loginTime = new Date().getTime();
  }

}
