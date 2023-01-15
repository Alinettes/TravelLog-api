import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from 'src/app/models/user';
import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})

export class ProfileUserPage implements OnInit {
  currentUser: User;
  trips: Trip[];

  constructor(public auth: AuthService, private tripService: TripService, public http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
    this.auth.getUser$().subscribe((user) => {
      this.currentUser = user;
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

  // C'est censé afficher les voyages de l'utilisateur
  // Pas fonctionnel pour le moment -> récupère tous les voyages de tous les utilisateurs
  // Essai de récupérer les voyages de l'utilisateur connecté dans trip.service.ts (getTripsFromUser(id: number))
  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
