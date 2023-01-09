import { Component, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {
  
  mapOptions: MapOptions;

  constructor() { 
    this.mapOptions = {
           layers: [
             tileLayer(
               'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
               { maxZoom: 18 }
             )
           ],
           zoom: 13,
           center: latLng(46.778186, 6.641524)
         };
         
  }
  
  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  ngOnInit() {
  }

}
