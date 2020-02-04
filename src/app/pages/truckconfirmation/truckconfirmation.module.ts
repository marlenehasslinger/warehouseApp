import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckconfirmationPageRoutingModule } from './truckconfirmation-routing.module';

import { TruckconfirmationPage } from './truckconfirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckconfirmationPageRoutingModule
  ],
  declarations: [TruckconfirmationPage]
})
export class TruckconfirmationPageModule {}
