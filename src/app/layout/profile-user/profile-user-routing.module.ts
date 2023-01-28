import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileUserPage } from './profile-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileUserPage
  },
  {
    path: 'trip/:tripId',
    loadChildren: () => import('../trip/trip.module').then(m => m.TripPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileUserPageRoutingModule {}
