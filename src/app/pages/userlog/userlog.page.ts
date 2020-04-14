import { Component, OnInit } from '@angular/core';
import { UserService, user } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {
  users: user[];
  searchClicked: boolean = false;
  tutorialChecked: boolean;

  //search results
  sampleArr = [];
  resultArr = [];

  constructor(private userService: UserService, private router: Router, public fs: AngularFirestore, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });

    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if (this.tutorialChecked) {
      this.presentAlert();
    }
  }

  navigateToUserDetail(user: user) {
    //this.router.navigate(['userdetail', JSON.stringify(user)]);
    this.router.navigate(['/menu/userlog/userlogdetail/', user.uid]);

  }

  search(event) {
    let searchKey: string = event.target.value;
    let firstLetter = searchKey.toUpperCase();

    if (searchKey.length == 0) {
      this.searchClicked = false;
      this.sampleArr = [];
      this.resultArr = [];
    } else {
      this.searchClicked = true;
    }

    if (this.sampleArr.length == 0) {
      this.fs.collection('users', ref => ref.where('searchIndex', '==', firstLetter)).snapshotChanges()
        .subscribe(data => {
          data.forEach(childData => {
            this.sampleArr.push(childData.payload.doc.data());
            this.resultArr.push(childData.payload.doc.data());
          })
        })
    }
    this.resultArr = [];
    this.sampleArr.forEach(val => {
      let name: string = val['firstname'];
      let n: string = name.toString().toUpperCase();
      if (n.startsWith(searchKey.toUpperCase())) {
        if (true) {
          this.resultArr.push(val);
        }
      }
    })

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Daisy101',
      cssClass: "scaledAlert",
      message: 'Welcome, Manager, to the \"Drivers\" screen where you can view all of your employees. Feel free to click on one to view more information.',
      buttons: ['OK']
    });

    await alert.present();
  }

}