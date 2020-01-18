import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlogdetailPage } from './userlogdetail.page';

const routes: Routes = [
  {
    path: '',
    component: UserlogdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserlogdetailPageRoutingModule {}
