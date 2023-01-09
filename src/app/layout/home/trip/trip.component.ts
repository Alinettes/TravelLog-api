import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../services/trip.service'
import { Trip } from '../../../models/trip'

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  oneTrip: Trip;

  constructor(private tripService: TripService) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    /* this.tripService.getTripById(id).subscribe(trip => {
      this.oneTrip = trip
    }); */
  }
}
