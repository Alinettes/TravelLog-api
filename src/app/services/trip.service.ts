import { Injectable } from '@angular/core';
import { Trip } from '../models/trip'
import { environment } from "src/environments/environment";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

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


}
