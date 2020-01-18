import { Component, OnInit } from '@angular/core';
import { UserService, user } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {
  users: user[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

  navigateToUserDetail(user: user){
    console.log("uid from userlog: "+ user.uid);
    //this.router.navigate(['userdetail', JSON.stringify(user)]);
    this.router.navigate(['/menu/userlog/userlogdetail/', user.uid]);

  }

}
