import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrucklogPage } from './trucklog.page';

const routes: Routes = [
  {
    path: '',
    component: TrucklogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucklogPageRoutingModule {}
