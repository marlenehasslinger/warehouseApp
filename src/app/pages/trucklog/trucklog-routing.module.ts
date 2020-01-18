import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrucklogPage } from './trucklog.page';

const routes: Routes = [
  {
    path: '',
    component: TrucklogPage
  },
  {
    path: 'trucklogdetail',
    loadChildren: () => import('./trucklogdetail/trucklogdetail.module').then( m => m.TrucklogdetailPageModule)
  },
  {
    path: 'trucklogdetail/:truck',
    loadChildren: () => import('./trucklogdetail/trucklogdetail.module').then( m => m.TrucklogdetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucklogPageRoutingModule {}
