
import { Component, OnInit } from '@angular/core';
import { UserService, timeLog, user } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userlogdetail',
  templateUrl: './userlogdetail.page.html',
  styleUrls: ['./userlogdetail.page.scss'],
})
export class UserlogdetailPage implements OnInit {
  timeLogs: timeLog[];
  driver: user;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let uid = this.route.snapshot.params['user'];
    console.log(uid);

    this.userService.getUserData(uid).subscribe(res => {
      this.driver = res;
      console.log(this.driver);
    });

    this.userService.getTimeLogs(uid).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
  }

}