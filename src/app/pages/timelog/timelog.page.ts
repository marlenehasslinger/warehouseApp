import { Component, OnInit } from '@angular/core';
import { UserService, timeLog } from 'src/app/services/user.service';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.page.html',
  styleUrls: ['./timelog.page.scss'],
})
export class TimelogPage implements OnInit {
  timeLogs: timeLog[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    let userId = this.userService.getUID();
    this.userService.getTimeLogs(userId).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
  }

}
