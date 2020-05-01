
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
    const uid = this.route.snapshot.params.user;

    this.userService.getUserData(uid).subscribe(res => {
      this.driver = res;
    });

    this.userService.getTimeLogs(uid).subscribe(res => {
      this.timeLogs = res;
    });
  }

}
