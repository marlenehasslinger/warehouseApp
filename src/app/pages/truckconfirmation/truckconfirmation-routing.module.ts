import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckconfirmationPage } from './truckconfirmation.page';

const routes: Routes = [
  {
    path: '',
    component: TruckconfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckconfirmationPageRoutingModule {}
