import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlogPage } from './userlog.page';

const routes: Routes = [
  {
    path: '',
    component: UserlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserlogPageRoutingModule {}
