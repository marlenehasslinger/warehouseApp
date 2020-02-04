import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'precheck',
    loadChildren: () => import('./pages/precheck/precheck.module').then( m => m.PrecheckPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'userlog',
    loadChildren: () => import('./pages/userlog/userlog.module').then( m => m.UserlogPageModule)
  },
  {
    path: 'trucklog',
    loadChildren: () => import('./pages/trucklog/trucklog.module').then( m => m.TrucklogPageModule)
  },
  {
    path: 'truckconfirmation',
    loadChildren: () => import('./pages/truckconfirmation/truckconfirmation.module').then( m => m.TruckconfirmationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
