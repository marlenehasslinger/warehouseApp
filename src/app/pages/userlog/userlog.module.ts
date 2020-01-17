import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserlogPageRoutingModule } from './userlog-routing.module';

import { UserlogPage } from './userlog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserlogPageRoutingModule
  ],
  declarations: [UserlogPage]
})
export class UserlogPageModule {}
