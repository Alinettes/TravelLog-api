import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModalController, ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { NewTripModalComponent } from 'src/app/modals/new-trip-modal/new-trip-modal.component';
import { NewPlaceModalComponent } from 'src/app/modals/new-place-modal/new-place-modal.component';
import { ActivatedRoute } from '@angular/router';

import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'

/* import { TripPage } from '../trip/trip.page'; */

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  trips: Trip[];
  places: Place[];

  /* component = TripPage; */

  constructor(private auth: AuthService, public http: HttpClient, private tripService: TripService, private placeService: PlaceService, private modalController: ModalController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  //utiliser mergemap pour avoir nom des users

  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
    this.placeService.getPlaces().subscribe(place => {
      this.places = place
    });
  }

  async showNewTripModal(): Promise<void> {
    const modal = await this.modalController.create({component: NewTripModalComponent });
    modal.present();
  }

  async showNewPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({component: NewPlaceModalComponent });
    Placemodal.present();
  }

  // *ngIf="";

}
