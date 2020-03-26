import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  private tutorialChecked: boolean;

  constructor() { }

  setServiceChecked(isChecked: boolean){
    this.tutorialChecked = isChecked;
    console.log("tutorial: " + this.tutorialChecked);
  }

  getServiceChecked(){
    return this.tutorialChecked;
  }

}