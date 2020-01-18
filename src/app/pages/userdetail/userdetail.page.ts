import { Component, OnInit } from '@angular/core';
import { UserService, timeLog, user } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.page.html',
  styleUrls: ['./userdetail.page.scss'],
})
export class UserdetailPage implements OnInit {
  timeLogs: timeLog[];
  driver: user;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.driver = JSON.parse(this.route.snapshot.params['user']);
   console.log(this.driver.uid);

   this.userService.getUserData(this.driver.uid).subscribe(res => {
     this.driver = res;
     console.log(this.driver);
   });

    this.userService.getTimeLogs(this.driver.uid).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
  }

}
