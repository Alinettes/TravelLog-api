import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, ViewWillEnter } from "@ionic/angular";

import { NewPlaceModalComponent } from 'src/app/modals/new-place-modal/new-place-modal.component';

import { latLng, Map, MapOptions, marker, Marker, LatLngExpression, tileLayer } from 'leaflet';
import { defaultIcon } from '../places-map/default-marker';

import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip;
  places: Place[];
  user: User;
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: Marker[];

  constructor(private route: ActivatedRoute, private tripService: TripService, private placeService: PlaceService, private userService: UserService, private modalController: ModalController) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 2,
      center: latLng(46.778186, 6.641524)
    };

    /* this.mapMarkers = [
      marker([ 48.8723208479839, 2.3185322694713597 ], { icon: defaultIcon })
    ]; */
  }

  ngOnInit() { }

  ionViewWillEnter(): void {
    let tripId = this.route.snapshot.params['tripId']

    this.tripService.getTripById(tripId).subscribe(trip => {
      this.trip = trip

      const userId = this.trip.userId
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user
      });
    });

    this.placeService.getPlacesByTrip(tripId).subscribe(places => {
      this.places = places

      this.mapOptions.center = latLng(places[0].location.coordinates[0], places[0].location.coordinates[1])

      this.mapMarkers = []
      places.forEach(place => {
        this.mapMarkers.push(marker(place.location.coordinates as LatLngExpression, { icon: defaultIcon }))
      });
    });

  }

  async showNewPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({component: NewPlaceModalComponent });
    Placemodal.present();
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }
}
