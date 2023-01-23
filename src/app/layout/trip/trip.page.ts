import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, ViewWillEnter } from "@ionic/angular";

import { NewPlaceModalComponent } from 'src/app/modals/new-place-modal/new-place-modal.component';

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

  constructor(private route: ActivatedRoute, private tripService: TripService, private placeService: PlaceService, private userService: UserService, private modalController: ModalController) { }

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

    this.placeService.getPlacesByTrip(tripId).subscribe(place => {
      this.places = place
    });

  }

  async showNewPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({component: NewPlaceModalComponent });
    Placemodal.present();
  }
}
