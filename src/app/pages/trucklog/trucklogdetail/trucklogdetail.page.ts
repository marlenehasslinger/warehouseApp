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
    const id = this.route.snapshot.params.truck;

    this.truckService.getTruckData(id).subscribe(res => {
      this.truck = res;
    });

    this.truckService.getTruckLogs(id).subscribe(res => {
      this.timeLogs = res;
    });
  }

}
