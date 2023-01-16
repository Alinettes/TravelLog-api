import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripPage } from './trip.page';

const routes: Routes = [
  {
    path: '',
    component: TripPage
  },      {
    path: 'place/:placeId',
    loadChildren: () => import('../place/place.module').then(m => m.PlacePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripPageRoutingModule {}
