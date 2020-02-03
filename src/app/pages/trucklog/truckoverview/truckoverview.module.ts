import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckoverviewPageRoutingModule } from './truckoverview-routing.module';

import { TruckoverviewPage } from './truckoverview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckoverviewPageRoutingModule
  ],
  declarations: [TruckoverviewPage]
})
export class TruckoverviewPageModule {}
