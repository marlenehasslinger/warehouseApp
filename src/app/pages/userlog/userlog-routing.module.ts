import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlogPage } from './userlog.page';

const routes: Routes = [
  {
    path: '',
    component: UserlogPage,
  },
  {
    path: 'userlogdetail',
    loadChildren: () => import('./userlogdetail/userlogdetail.module').then( m => m.UserlogdetailPageModule)
  },
  {
    path: 'userlogdetail/:user',
    loadChildren: () => import('./userlogdetail/userlogdetail.module').then( m => m.UserlogdetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserlogPageRoutingModule {}
