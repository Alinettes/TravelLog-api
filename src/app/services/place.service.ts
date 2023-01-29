import { Injectable } from '@angular/core';
import { Place, PlaceModify, PlaceRequest } from '../models/place'
import { environment } from "src/environments/environment";
import { Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Point } from 'leaflet';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient, private AuthService: AuthService) { }

  getPlaces(): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.apiUrl}/places`);
  }

  getPlaceById(id: string): Observable<Place> {
    return this.http
      .get<Place>(`${environment.apiUrl}/places/${id}`)
  }

  getPlacesByTrip(id: string): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.apiUrl}/places?trip=${id}`);
  }

  createPlace(place: PlaceRequest): Observable<Place> {
    let httpsOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.AuthService.getToken$().subscribe((token) => {
      httpsOptions.headers = httpsOptions.headers.set('Authorization', `Bearer ${token}`);
    })
    return this.http.post<Place>(environment.apiUrl + "/places", place, httpsOptions);
  }

  modifyPlace(place: PlaceModify){
    let httpsOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.AuthService.getToken$().subscribe((token) => {
      httpsOptions.headers = httpsOptions.headers.set('Authorization', `Bearer ${token}`)})
    
    const placeData = {
      name: place.name, 
      description: place.description,
      location: place.location,
      pictureUrl: place.pictureUrl,
      tripId: place.tripId
    }
    const placeDataClean = Object.entries(placeData)
      .filter(([key, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

      return this.http.patch(environment.apiUrl + `/places/${place.id}`, placeDataClean, httpsOptions)
      .pipe(
        map(response => {
          console.log(response)
        }),
        catchError(error => {
          return throwError(error);
        })
      ).subscribe(
        (data) => console.log("success: ", data),
        (error) => console.log("error: ", error)
      );
  }


  deletePlace(place: Place) {
    let httpsOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.AuthService.getToken$().subscribe((token) => {
      httpsOptions.headers = httpsOptions.headers.set('Authorization', `Bearer ${token}`)
    })
    return this.http.delete(environment.apiUrl + `/places/${place.id}`, httpsOptions).subscribe(async data => {
    })
  }

}