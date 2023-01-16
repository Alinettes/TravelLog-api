import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip;
  places: Place[];

  constructor(private route: ActivatedRoute, private tripService: TripService, private placeService: PlaceService) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    let id = this.route.snapshot.params['tripId']

    this.tripService.getTripById(id).subscribe(trip => {
      this.trip = trip
    });

    this.placeService.getPlacesByTrip(id).subscribe(place => {
      this.places = place
    });
  }
}
