import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from 'src/app/models/user';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { NewTripModalComponent } from 'src/app/modals/new-trip-modal/new-trip-modal.component';
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})

export class ProfileUserPage implements OnInit {
  currentUser: User;
  trips: Trip[];

  constructor(public auth: AuthService, private tripService: TripService, private modalController: ModalController  , public http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
    this.auth.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
  }

  // Ces fonctions vont servir à scroller au sein de la zone card des voyages
  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }

  ionViewWillEnter(): void {
    let id = this.currentUser.id;

    this.tripService.getTripsByUser(id).subscribe(trip => {
      this.trips = trip
    });
  }
// Fonction qui va permettre d'ouvrir la modal de création de voyage
  async showNewTripModal(): Promise<void> {
    const modal = await this.modalController.create({component: NewTripModalComponent });
    modal.present();
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
