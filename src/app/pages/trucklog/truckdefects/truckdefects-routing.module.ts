import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckdefectsPage } from './truckdefects.page';

const routes: Routes = [
  {
    path: '',
    component: TruckdefectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckdefectsPageRoutingModule {}
