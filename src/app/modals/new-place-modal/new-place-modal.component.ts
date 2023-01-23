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

import { PictureService } from '../../services/picture.service'
import { QimgImage } from '../../models/qimgimage'


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
  picture: QimgImage;

  constructor(private modalCtrl: ModalController, private toastController: ToastController, private tripService: TripService, private placeService: PlaceService, private pictureService: PictureService) { }

  ngOnInit() { }


  ionViewWillEnter(): void {
    this.tripService.getTrips().subscribe(trip => {
      this.trips = trip
    });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ajouter(form: NgForm) {
    if (form.valid) {
    this.modal.dismiss(this.name, 'ajouter');
    this.modal.dismiss(this.description, 'ajouter');
    this.modal.dismiss(this.location, 'ajouter');
    this.modal.dismiss(this.picture.url, 'ajouter');
    this.modal.dismiss(this.tripId, 'ajouter');
    this.placeService.createPlace({
      name: this.name,
      description: this.description,
      location: this.location.coordinates,
      pictureUrl: this.picture.url,
      tripId: this.tripId
    }).subscribe((response) =>{
      console.log(response)
    },
    (error)=> {
      console.log(error)
    });

    console.log(this.name, this.description, this.location, this.picture.url, this.tripId)
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

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(data => {
      this.picture = data;
    });
  }
}
