import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

export interface userData {
	firstname: string,
  lastname: string,
  pin: string
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private userCollection: AngularFirestoreCollection<userData>;

  constructor(public db: AngularFirestore) {
    this.userCollection = db.collection<userData>('users');

  }

  getUserData(id: string){
    return this.userCollection.doc<userData>(id).valueChanges();
  }

  updateUserData(user:userData, id){
    return this.userCollection.doc<userData>(id).valueChanges();
  }
}
