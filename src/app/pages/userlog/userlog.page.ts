import { Component, OnInit } from '@angular/core';
import { UserService, user } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {
  users: user[];
  searchClicked = false;
  tutorialChecked: boolean;

  // search results
  sampleArr = [];
  resultArr = [];

  constructor(private userService: UserService, private router: Router, private tutorialService: TutorialService, private alertController: AlertController) { }

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
    // this.router.navigate(['userdetail', JSON.stringify(user)]);
    this.router.navigate(['/menu/userlog/userlogdetail/', user.uid]);

  }

  search(event) {
    const searchKey: string = event.target.value;
    const firstLetter: string = searchKey.toUpperCase();

    if (searchKey.length == 0) {
      this.searchClicked = false;
      this.sampleArr = [];
      this.resultArr = [];
    } else {
      this.searchClicked = true;
    }

    if (this.sampleArr.length == 0) {
      this.userService.getUsersWithFirstLetter(firstLetter)
        .subscribe(data => {
          data.forEach(childData => {
            this.sampleArr.push(childData);
            this.resultArr.push(childData);
          });
        });
    }

    this.resultArr = [];
    this.sampleArr.forEach(val => {
      const name: string = val.firstname;
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
      message: 'Welcome, Manager, to the \"Drivers\" screen where you can view all of your employees. Feel free to click on one to view more information.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
