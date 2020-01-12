import { Injectable } from '@angular/core';
import { truck } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  truck: truck = {
    name: "",
    duration: 0,
    id: ""
  }

  constructor() { }

  setTruck(id:string){
    this.truck.id = id;
    }

  getTruck(){
    return this.truck;
  }

  getTruckId(){
    return this.truck.id;
  }
}
