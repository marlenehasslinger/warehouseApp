import { Component, OnInit } from '@angular/core';
import { DbService, timeLog } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.page.html',
  styleUrls: ['./timelog.page.scss'],
})
export class TimelogPage implements OnInit {
  timeLogs: timeLog[];

  constructor(private dbService: DbService, private userService:UserService) { }

  ngOnInit() {
    let userId = this.userService.getUID();
    this.dbService.getTimeLogs(userId).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
  }

}
