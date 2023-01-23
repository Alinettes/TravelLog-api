import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'
import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  place: Place;
  trip: Trip;
  user: User;

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private userService: UserService, private tripService: TripService) { }

  ngOnInit() {}

  ionViewWillEnter(): void {
    let id = this.route.snapshot.params['placeId']

    this.placeService.getPlaceById(id).subscribe(place => {
      this.place = place
      const tripId = this.place.tripId

      this.tripService.getTripById(tripId).subscribe(trip => {
        this.trip = trip
        const userId = this.trip.userId

        this.userService.getUserById(userId).subscribe(user => {
          this.user = user
          console.log(this.user)
        });
      });
    });
  }

}
