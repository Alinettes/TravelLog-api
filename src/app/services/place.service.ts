import { Injectable } from '@angular/core';
import { Place, PlaceRequest } from '../models/place'
import { environment } from "src/environments/environment";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

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
      .get<Place>(`${environment.apiUrl}/places/${id}`);
  }

  getPlacesByTrip(id: string): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.apiUrl}/places?trip=${id}`);
  }

  createPlace(place: PlaceRequest): Observable<Place> {
    let httpsOptions= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
    }
    this.AuthService.getToken$().subscribe((token) => {
      httpsOptions.headers = httpsOptions.headers.set('Authorization', `Bearer ${token}`);
    })
    return this.http.post<Place>(environment.apiUrl + "/places", place, httpsOptions);
  }
}
