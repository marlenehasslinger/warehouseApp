
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TruckService, truck } from 'src/app/services/truck.service';

@Component({
  selector: 'app-trucklog',
  templateUrl: './trucklog.page.html',
  styleUrls: ['./trucklog.page.scss'],
})
export class TrucklogPage implements OnInit {
  trucks: truck[];

  constructor(private truckService: TruckService, private router: Router) { }

  ngOnInit() {
    this.truckService.getAllTrucks().subscribe(res => {
      this.trucks = res;
      console.log(this.trucks);
    });
  }

  navigateToTruckDetail(truck: truck){
    /*
    console.log("uid from userlog: "+ user.uid);
    //this.router.navigate(['userdetail', JSON.stringify(user)]);
    this.router.navigate(['/menu/userlog/userlogdetail/', user.uid]);
    */

  }
  

}