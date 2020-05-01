import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private tutorialChecked: boolean;

  constructor() { }

  setServiceChecked(isChecked: boolean) {
    this.tutorialChecked = isChecked;
  }

  getServiceChecked() {
    return this.tutorialChecked;
  }

}
