import { Injectable } from '@angular/core';
import { Place } from '../models/place'
import { environment } from "src/environments/environment";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.apiUrl}/places`);
  }
}
