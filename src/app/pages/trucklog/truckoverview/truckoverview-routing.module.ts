import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckoverviewPage } from './truckoverview.page';

const routes: Routes = [
  {
    path: '',
    component: TruckoverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckoverviewPageRoutingModule {}
