import { Component, OnInit } from '@angular/core';
import { UserService, timeLog, user } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {
  timeLogs: timeLog[];
  users: user[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    let userId = this.userService.getUID();
    this.userService.getTimeLogs(userId).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });;
  }

}
