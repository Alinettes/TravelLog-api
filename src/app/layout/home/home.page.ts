import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  /* title: string;
  titleComment: string; */
  trips: Trip[];
  places: Place[];

  constructor(private auth: AuthService, public http: HttpClient, private tripService: TripService, private placeService: PlaceService) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
    this.placeService.getPlaces().subscribe(place => {
      this.places = place
    });
  }
}
