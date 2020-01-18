import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TruckService, truck, truckTimeLog } from 'src/app/services/truck.service';

@Component({
  selector: 'app-trucklogdetail',
  templateUrl: './trucklogdetail.page.html',
  styleUrls: ['./trucklogdetail.page.scss'],
})
export class TrucklogdetailPage implements OnInit {
  timeLogs: truckTimeLog[];
  truck: truck;

  constructor(private truckService: TruckService, private route: ActivatedRoute) { }

  ngOnInit() {
    let truckid = this.route.snapshot.params['truck'];
    console.log(truckid);

    this.truckService.getTruckData(truckid).subscribe(res => {
      this.truck = res;
      console.log(this.truck);
    });

    this.truckService.getTruckLogs(truckid).subscribe(res => {
      this.timeLogs = res;
      console.log(this.timeLogs);
    });
  }

}