import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { environment } from "src/environments/environment";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`);
  }
}
