import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyListingsAddPageRoutingModule } from './my-listings-add-routing.module';

import { MyListingsAddPage } from './my-listings-add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MyListingsAddPageRoutingModule
  ],
  declarations: [MyListingsAddPage]
})
export class MyListingsAddPageModule {}
