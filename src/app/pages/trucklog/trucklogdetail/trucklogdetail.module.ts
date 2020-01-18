import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrucklogdetailPageRoutingModule } from './trucklogdetail-routing.module';

import { TrucklogdetailPage } from './trucklogdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrucklogdetailPageRoutingModule
  ],
  declarations: [TrucklogdetailPage]
})
export class TrucklogdetailPageModule {}
