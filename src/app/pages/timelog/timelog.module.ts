import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelogPageRoutingModule } from './timelog-routing.module';

import { TimelogPage } from './timelog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelogPageRoutingModule
  ],
  declarations: [TimelogPage]
})
export class TimelogPageModule {}
