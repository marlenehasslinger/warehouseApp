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
  },
  {
    path: 'truckoverview/:truck',
    loadChildren: () => import('./truckoverview/truckoverview.module').then( m => m.TruckoverviewPageModule)
  },
  {
    path: 'truckdefects/:truck',
    loadChildren: () => import('./truckdefects/truckdefects.module').then( m => m.TruckdefectsPageModule)
  },
  {
    path: 'truckdefects',
    loadChildren: () => import('./truckdefects/truckdefects.module').then( m => m.TruckdefectsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucklogPageRoutingModule {}
