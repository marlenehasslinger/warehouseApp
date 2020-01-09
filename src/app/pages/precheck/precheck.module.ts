import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecheckPageRoutingModule } from './precheck-routing.module';

import { PrecheckPage } from './precheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecheckPageRoutingModule
  ],
  declarations: [PrecheckPage]
})
export class PrecheckPageModule {}
