import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserlogdetailPageRoutingModule } from './userlogdetail-routing.module';

import { UserlogdetailPage } from './userlogdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserlogdetailPageRoutingModule
  ],
  declarations: [UserlogdetailPage]
})
export class UserlogdetailPageModule {}
