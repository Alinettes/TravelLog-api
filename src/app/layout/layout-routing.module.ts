import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'places-map',
        loadChildren: () => import('./places-map/places-map.module').then( m => m.PlacesMapPageModule)
      },
      {
        path: 'profile-user',
        loadChildren: () => import('./profile-user/profile-user.module').then( m => m.ProfileUserPageModule)
      },
      {
        path: 'trip/:id',
        loadChildren: () => import('./trip/trip.module').then(m => m.TripPageModule)
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
