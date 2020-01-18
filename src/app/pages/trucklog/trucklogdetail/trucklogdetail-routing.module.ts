import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrucklogdetailPage } from './trucklogdetail.page';

const routes: Routes = [
  {
    path: '',
    component: TrucklogdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucklogdetailPageRoutingModule {}
