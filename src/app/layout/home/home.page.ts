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
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'
import { PictureService } from '../../services/picture.service'
import { QimgImage } from '../../models/qimgimage'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  trips: Trip[];
  places: Place[];
  picture: QimgImage;

  tripsSearch: Trip[];

  constructor(private auth: AuthService, public http: HttpClient, private tripService: TripService, private placeService: PlaceService, private modalController: ModalController, private activatedRoute: ActivatedRoute, private userService: UserService, private pictureService: PictureService) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trips => {

      trips.forEach(trip => {
        const userId = trip.userId

        this.userService.getUserById(userId).subscribe(user => {
          trip.userId = user.name
        });
      });

      this.trips = trips
      this.tripsSearch = trips
    });

    this.placeService.getPlaces().subscribe(place => {
      this.places = place
    });
  }

  async showNewTripModal(): Promise<void> {
    const modal = await this.modalController.create({ component: NewTripModalComponent });
    modal.present();
  }

  async showNewPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({ component: NewPlaceModalComponent });
    Placemodal.present();
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(data => {
      this.picture = data;
    });
  }

  searchInput = '';
  onKey(event: KeyboardEvent) {
    this.searchInput = (event.target as HTMLInputElement).value

    this.tripService.getTripsBySearch(this.searchInput).subscribe(trips => {

      trips.forEach(trip => {
        const userId = trip.userId

        this.userService.getUserById(userId).subscribe(user => {
          trip.userId = user.name
        });
      });

      this.tripsSearch = trips
    });
  }
}
