import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollisionsPageRoutingModule } from './collisions-routing.module';

import { CollisionsPage } from './collisions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollisionsPageRoutingModule
  ],
  declarations: [CollisionsPage]
})
export class CollisionsPageModule {}
