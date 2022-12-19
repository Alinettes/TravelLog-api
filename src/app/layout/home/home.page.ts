import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  /* title: string;
  titleComment: string; */
  trips: Trip[];

  constructor(private auth: AuthService, public http: HttpClient, private tripService: TripService) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
  }
}
