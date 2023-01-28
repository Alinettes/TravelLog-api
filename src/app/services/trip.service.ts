import { Injectable } from '@angular/core';
import { Trip, TripRequest } from '../models/trip'
import { environment } from "src/environments/environment";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private AuthService: AuthService) { }

  getTrips(): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(`${environment.apiUrl}/trips`);
  }

  getTripById(id: string): Observable<Trip> {
    return this.http
      .get<Trip>(`${environment.apiUrl}/trips/${id}`);
  }

  // Recupérer les voyages de l'utilisateur loggé
  // Doit être utilisé dans profile-user.page.ts
  getTripsFromUser(id: number): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(`${environment.apiUrl}/trips/${id}`);
  }

  createTrip(trip: TripRequest): Observable<Trip> {
    let httpsOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.AuthService.getToken$().subscribe((token) => {
      httpsOptions.headers = httpsOptions.headers.set('Authorization', `Bearer ${token}`);
    })
    return this.http.post<Trip>(environment.apiUrl + "/trips", trip, httpsOptions);
  }

}
