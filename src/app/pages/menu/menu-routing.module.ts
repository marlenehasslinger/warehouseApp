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
        path: '',
        redirectTo: '/menu/orders'
      },
      {
        path: 'userdetail/:user',
        loadChildren: () => import('../userdetail/userdetail.module').then( m => m.UserdetailPageModule)
      },
      {
        path: 'userdetail',
        loadChildren: () => import('../userdetail/userdetail.module').then( m => m.UserdetailPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}