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
import { PictureService } from '../../services/picture.service'
import { QimgImage } from '../../models/qimgimage'


@Component({
  selector: 'app-new-place-modal',
  templateUrl: './new-place-modal.component.html',
  styleUrls: ['./new-place-modal.component.scss'],
})

export class NewPlaceModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = "test pour voir si ça marche";
  name: string;
  description: string;
  location: any;
  tripId: string;
  trips: Trip[];
  picture: QimgImage;
  pictureUrl: string;
  latitude: number;
  longitude: number;


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
      this.modal.dismiss(this.latitude, 'ajouter');
      this.modal.dismiss(this.longitude, 'ajouter');
      this.modal.dismiss(this.picture.url, 'ajouter');
      this.modal.dismiss(this.tripId, 'ajouter');
      console.log(this.latitude, this.longitude)
      let oneLocation = {
        type: "Point",
        coordinates: [this.latitude, this.longitude]
      }
      console.log("La loc est : " + oneLocation)
      this.placeService.createPlace({
        name: this.name,
        description: this.description,
        location: oneLocation,
        pictureUrl: this.picture.url,
        tripId: this.tripId
      }).subscribe((response) => {
        console.log(response)
        this.modalCtrl.dismiss()
        window.location.reload()
      },
        (error) => {
          console.log(error)
        });

      console.log(this.name, this.description, oneLocation, this.picture, this.tripId)
    }
  }

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
