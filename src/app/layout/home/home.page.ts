import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModalController, ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { NewTripModalComponent } from 'src/app/modals/new-trip-modal/new-trip-modal.component';
import { NewPlaceModalComponent } from 'src/app/modals/new-place-modal/new-place-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService, public http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
  }

  //⚠ Doing an HTTP request inside a component's code is NOT a best practice. Components should not be responsible of retrieving the data, they should only be responsible of asking another service for it and providing it to their template.
  //In your application, you should define dedicated services that will handle calling your API.

  ionViewWillEnter(): void {
    const url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }

  async showNewTripModal(): Promise<void> {
    const modal = await this.modalController.create({component: NewTripModalComponent });
    modal.present();
  }

  async showNewPlaceModal(): Promise<void> {
    const Placemodal = await this.modalController.create({component: NewPlaceModalComponent });
    Placemodal.present();
  }

  // *ngIf="";

}