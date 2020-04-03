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
  searchClicked:boolean = false;
  tutorialChecked: boolean;

  //search results
  sampleArr=[];
  resultArr=[];

  constructor(private userService: UserService, private router: Router, public fs: AngularFirestore, private tutorialService: TutorialService, private alertController: AlertController) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });

    this.tutorialChecked = this.tutorialService.getServiceChecked();
    if(this.tutorialChecked){
      this.presentAlert();
    }
  }

  navigateToUserDetail(user: user){
    console.log("uid from userlog: "+ user.uid);
    //this.router.navigate(['userdetail', JSON.stringify(user)]);
    this.router.navigate(['/menu/userlog/userlogdetail/', user.uid]);

  }

  search(event){
    console.log("entered search function");
    let searchKey:string=event.target.value;
    console.log("searchKey: " + searchKey);
    let firstLetter=searchKey.toUpperCase();
    console.log("firstLetter: " + firstLetter);

    if(searchKey.length==0){
      this.searchClicked = false;
      this.sampleArr=[];
      this.resultArr=[];
    } else {
      this.searchClicked = true;
    }

    if(this.sampleArr.length==0){
      console.log("in sampleArr.length==0");
      this.fs.collection('users', ref => ref.where('searchIndex', '==', firstLetter)).snapshotChanges()
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
      this.resultArr=[];
      this.sampleArr.forEach(val=>{
        let name:string=val['firstname'];
        let n:string = name.toString().toUpperCase();
        if(n.startsWith(searchKey.toUpperCase())){
          if(true){
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
      message: 'Welcome, Manager, to the \"Drivers\" screen where you can view all of your employees. Feel free to click on one to view more information.',
      buttons: ['OK']
    });

    await alert.present();
  }

}