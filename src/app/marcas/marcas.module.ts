import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcasPageRoutingModule } from './marcas-routing.module';

import { MarcasPage } from './marcas.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MarcasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MarcasPage]
})
export class MarcasPageModule {}
