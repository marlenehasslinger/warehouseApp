import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrucklogPageRoutingModule } from './trucklog-routing.module';

import { TrucklogPage } from './trucklog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrucklogPageRoutingModule
  ],
  declarations: [TrucklogPage]
})
export class TrucklogPageModule {}
