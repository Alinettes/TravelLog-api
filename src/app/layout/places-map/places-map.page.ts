import { Component, OnInit } from '@angular/core';

import { defaultIcon } from './default-marker';
import { latLng, Map, MapOptions, tileLayer, Marker, marker } from 'leaflet';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {
  
  map: Map;
  mapOptions: MapOptions;
  mapMarkers: Marker[];

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
         
    this.mapMarkers = [
          marker([ 46.778186, 6.641524 ], { icon: defaultIcon }),
          marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
          marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
          ];
    
    
         
  }
  
  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map;
    
    //Ajouter des markers interactifs
    // this.map.on('click', () =>{
      
    // })
  }

  

  // onMapReady(map: Map) {
  //   this.map = map;
  // }

  ngOnInit() {
  }

}
