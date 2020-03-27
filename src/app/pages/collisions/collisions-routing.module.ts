import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollisionsPage } from './collisions.page';

const routes: Routes = [
  {
    path: '',
    component: CollisionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollisionsPageRoutingModule {}
