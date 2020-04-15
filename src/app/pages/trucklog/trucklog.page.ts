import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trucklog',
  templateUrl: './trucklog.page.html',
  styleUrls: ['./trucklog.page.scss'],
})
export class TrucklogPage implements OnInit {
  trucks: truck[];
  searchClicked = false;
  tutorialChecked: boolean;
  // search results
  sampleArr = [];
  resultArr = [];

  constructor(private truckService: TruckService, private router: Router, public fs: AngularFirestore, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() {
    this.truckService.getAllTrucks().subscribe(res => {
      this.trucks = res;
    });

    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if (this.tutorialChecked) {
      this.presentAlert();
    }
  }

  navigateToTruckOverview(truck: truck) {
    this.router.navigate(['/menu/trucklog/truckoverview/', truck.id]);

  }


  search(event) {
    const searchKey: string = event.target.value;
    const firstLetter = searchKey.toUpperCase();

    if (searchKey.length == 0) {
      this.searchClicked = false;
      this.sampleArr = [];
      this.resultArr = [];
    } else {
      this.searchClicked = true;
    }

    if (this.sampleArr.length == 0) {
      this.fs.collection('trucks', ref => ref.where('searchIndex', '==', firstLetter)).snapshotChanges()
        .subscribe(data => {
          data.forEach(childData => {
            this.sampleArr.push(childData.payload.doc.data());
            this.resultArr.push(childData.payload.doc.data());
          });
        });
    }
    this.resultArr = [];
    this.sampleArr.forEach(val => {
      const name: string = val.name;
      const n: string = name.toString().toUpperCase();
      if (n.startsWith(searchKey.toUpperCase())) {
        if (true) {
          this.resultArr.push(val);
        }
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: 'scaledAlert',
      message: 'Welcome, Manager, to the \"Trucks\" screen where you can view all of your trucks and see information like usage and collisions.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
