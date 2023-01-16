import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  place: Place;

  constructor(private route: ActivatedRoute, private placeService: PlaceService) { }

  ngOnInit() {}

  ionViewWillEnter(): void {
    let id = this.route.snapshot.params['placeId']

    this.placeService.getPlaceById(id).subscribe(place => {
      this.place = place
    });
  }

}
