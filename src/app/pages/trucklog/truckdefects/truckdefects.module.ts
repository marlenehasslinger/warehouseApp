import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckdefectsPageRoutingModule } from './truckdefects-routing.module';

import { TruckdefectsPage } from './truckdefects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckdefectsPageRoutingModule
  ],
  declarations: [TruckdefectsPage]
})
export class TruckdefectsPageModule {}
