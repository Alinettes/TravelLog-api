import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NgForm } from '@angular/forms'
import { Point } from 'leaflet';
import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { PlaceRequest } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { create } from 'domain';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-new-place-modal',
  templateUrl: './new-place-modal.component.html',
  styleUrls: ['./new-place-modal.component.scss'],
})

export class NewPlaceModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message= "test pour voir si ça marche";
  name: string;
  description: string;
  location: any;
  pictureUrl: string;
  tripId: string;
  trips: Trip[];

  constructor(private modalCtrl: ModalController, private toastController: ToastController, private tripService: TripService, private placeService: PlaceService) { }

  ngOnInit() { }


  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ajouter(form: NgForm) {
    if (form.valid) {
    this.modal.dismiss(this.name, 'ajouter');
    this.modal.dismiss(this.description, 'ajouter');
    this.modal.dismiss(this.location, 'ajouter');
    this.modal.dismiss(this.pictureUrl, 'ajouter');
    this.modal.dismiss(this.tripId, 'ajouter');
    this.placeService.createPlace({
      name: this.name,
      description: this.description,
      location: this.location.coordinates,  
      pictureUrl: this.pictureUrl,
      tripId: this.tripId
    }).subscribe((response) =>{
      console.log(response)
      this.modalCtrl.dismiss()
    },
    (error)=> {
      console.log(error)
    });

    console.log(this.name, this.description, this.location.coordinates, this.pictureUrl, this.tripId)
    this.modalCtrl.dismiss() //Le dismiss devra aller dans le subscribe
    }
  }

  //Version qui fonctionne
  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Nouveau lieu ajouté !',
      duration: 3000,
      position: position
    });
    await toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'ajouter') {
      this.message = `Nouveau lieu ajouté, ${ev.detail.data}!`;
    }
  }
}
