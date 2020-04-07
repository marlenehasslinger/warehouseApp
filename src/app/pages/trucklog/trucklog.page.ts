import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
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
  searchClicked: boolean = false;
  tutorialChecked: boolean;
  //search results
  sampleArr = [];
  resultArr = [];

  constructor(private truckService: TruckService, private router: Router, public fs: AngularFirestore, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() {
    this.truckService.getAllTrucks().subscribe(res => {
      this.trucks = res;
      console.log(this.trucks);
    });

    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if(this.tutorialChecked){
      this.presentAlert();
    }
  }

  navigateToTruckOverview(truck: truck) {
    console.log("uid from trucklog: " + truck.id);
    this.router.navigate(['/menu/trucklog/truckoverview/', truck.id]);

  }


  search(event) {
    console.log("entered search function");
    let searchKey: string = event.target.value;
    console.log("searchKey: " + searchKey);
    let firstLetter = searchKey.toUpperCase();
    console.log("firstLetter: " + firstLetter);

    if (searchKey.length == 0) {
      this.searchClicked = false;
      this.sampleArr = [];
      this.resultArr = [];
    } else {
      this.searchClicked = true;
    }

    if (this.sampleArr.length == 0) {
      console.log("in sampleArr.length==0");
      this.fs.collection('trucks', ref => ref.where('searchIndex', '==', firstLetter)).snapshotChanges()
        .subscribe(data => {
          data.forEach(childData => {
            console.log("childData: " + JSON.stringify(childData.payload.doc.data()));
            this.sampleArr.push(childData.payload.doc.data());
            this.resultArr.push(childData.payload.doc.data());
            console.log("sampleArr: " + JSON.stringify(this.sampleArr));
          })
        })
    }
    console.log("in sampleArr.length!=0");
    this.resultArr = [];
    this.sampleArr.forEach(val => {
      let name: string = val['name'];
      let n: string = name.toString().toUpperCase();
      if (n.startsWith(searchKey.toUpperCase())) {
        if (true) {
          console.log("in true loop");
          this.resultArr.push(val);
          console.log("resultArr: " + JSON.stringify(this.resultArr));
        }
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: "scaledAlert",
      message: 'Welcome, Manager, to the \"Trucks\" screen where you can view all of your trucks and see information like usage and collisions.',
      buttons: ['OK']
    });

    await alert.present();
  }

}