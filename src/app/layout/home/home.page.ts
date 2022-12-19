import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService, public http: HttpClient) { }

  ngOnInit() {
  }

  //⚠ Doing an HTTP request inside a component's code is NOT a best practice. Components should not be responsible of retrieving the data, they should only be responsible of asking another service for it and providing it to their template.
  //In your application, you should define dedicated services that will handle calling your API.

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = "https://travel-log-sqtk.onrender.com/api/trips";
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }
}
