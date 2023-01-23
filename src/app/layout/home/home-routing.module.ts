import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'trip/:tripId',
    loadChildren: () => import('../trip/trip.module').then(m => m.TripPageModule)
  },
  {
    path: 'place/:placeId',
    loadChildren: () => import('../place/place.module').then(m => m.PlacePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
