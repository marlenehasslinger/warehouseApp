import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TruckService, truck } from 'src/app/services/truck.service';

@Component({
  selector: 'app-truckoverview',
  templateUrl: './truckoverview.page.html',
  styleUrls: ['./truckoverview.page.scss'],
})
export class TruckoverviewPage implements OnInit {
  truck: truck;

  constructor(private truckService: TruckService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.truck;

    this.truckService.getTruckData(id).subscribe(res => {
      this.truck = res;
    });

  }

  navigateToTruckDetail() {
    this.router.navigate(['/menu/trucklog/trucklogdetail/', this.truck.id]);

  }

  navigateToTruckDefects() {
    this.router.navigate(['/menu/trucklog/truckdefects/', this.truck.id]);

  }

}
