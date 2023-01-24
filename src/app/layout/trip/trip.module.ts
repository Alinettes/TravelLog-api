import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPageRoutingModule } from './trip-routing.module';

import { TripPage } from './trip.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripPageRoutingModule,
    LeafletModule
  ],
  declarations: [TripPage]
})
export class TripPageModule {}
