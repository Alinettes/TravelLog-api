import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { PlacePageRoutingModule } from './place-routing.module';

import { PlacePage } from './place.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ModalsModule } from "../../modals/modals.module";


@NgModule({
    declarations: [PlacePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlacePageRoutingModule,
        LeafletModule,
        ModalsModule,
    ],
    providers: [NavParams]
})
export class PlacePageModule {}
