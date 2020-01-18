import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'userlog',
        loadChildren: () => import('../userlog/userlog.module').then( m => m.UserlogPageModule)
      },
      {
        path: 'trucklog',
        loadChildren: () => import('../trucklog/trucklog.module').then( m => m.TrucklogPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/orders'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}