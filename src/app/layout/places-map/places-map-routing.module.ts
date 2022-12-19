import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesMapPage } from './places-map.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesMapPageRoutingModule {}
