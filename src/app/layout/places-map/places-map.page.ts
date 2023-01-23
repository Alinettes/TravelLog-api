import { Component, NgZone, OnInit } from '@angular/core';

import { defaultIcon } from './default-marker';
import { latLng, Map, MapOptions, tileLayer, Marker, marker, LatLngExpression } from 'leaflet';
import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'
import { addIcons } from 'ionicons';
import { threadId } from 'worker_threads';
import { timingSafeEqual } from 'crypto';
import { ModalController, ViewWillEnter } from "@ionic/angular";
import { ShowDescriptionModalComponent } from 'src/app/modals/show-description-modal/show-description-modal.component';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {
  
  map: Map;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  places: Place[];
  selectedPlaces: Place;

  // isModalOpen = false;

  // setOpen(isOpen: boolean) {
  //   this.isModalOpen = isOpen;
  // }

  constructor(private placeService: PlaceService, private zone: NgZone, private modalController: ModalController) { 
    this.mapOptions = {
           layers: [
             tileLayer(
               'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
               { maxZoom: 18 }
             )
           ],
           zoom: 4,
           center: latLng(46.778186, 6.641524)
         };
         
    this.mapMarkers = [
      
          // marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
          // marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
          // marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
          ];
    
    
    
         
  }
  
  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map;
    
    // Ajouter des markers interactifs
    // this.map.on('click', () =>{
      
    // })
  }

  

  // onMapReady(map: Map) {
  //   this.map = map;
  // }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
        this.placeService.getPlaces().subscribe(place => {
        this.places = place;
        //console.log(this.places)
        this.places.forEach(place => {

          this.mapMarkers.push(marker(place.location.coordinates as LatLngExpression, { icon: defaultIcon })
          .bindTooltip(place.name)
          .on('click', () =>{
            this.zone.run(() => {
              this.selectedPlaces = place;
               this.showDescriptionModal()
              //ModalController //preset
              //console.log(this.selectedPlaces.name)
            })
            // console.log(place.name, place.description)
            
          })
          )
          //console.log(place.location.coordinates)
        });
        
        
    });
  }
  
  async showDescriptionModal(): Promise<void> {
    // console.log(this.selectedPlaces.name, this.selectedPlaces.description)
    const modal = await this.modalController.create({component: ShowDescriptionModalComponent });

    modal.present();
  }

  

}

