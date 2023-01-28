import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, ToastController, NavController } from "@ionic/angular";
import { ModifyPlaceModalComponent } from 'src/app/modals/modify-place-modal/modify-place-modal.component';
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

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private modalController: ModalController, private navController: NavController, private toastController: ToastController, private userService: UserService, private tripService: TripService) { }

  ngOnInit() { }

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

  async modifyPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({ component: ModifyPlaceModalComponent });
    Placemodal.present();
  }

  async delete(service: Place) {
    await this.placeService.deletePlace(this.place)
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Lieu supprimé !',
      duration: 3000,
      position: position
    });
    await toast.present();
    this.navController.back();
  }

}