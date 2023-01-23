import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacePageRoutingModule } from './place-routing.module';

import { PlacePage } from './place.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacePageRoutingModule,
    LeafletModule
  ],
  declarations: [PlacePage]
})
export class PlacePageModule {}
