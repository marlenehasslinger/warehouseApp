import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelogPage } from './timelog.page';

const routes: Routes = [
  {
    path: '',
    component: TimelogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelogPageRoutingModule {}
