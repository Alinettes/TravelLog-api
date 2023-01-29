import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { TripService } from '../../services/trip.service'
import { Trip } from 'src/app/models/trip';
import { Place } from 'src/app/models/place';
import { User } from 'src/app/models/user';
import { OverlayEventDetail } from '@ionic/core/components';
import { NgForm } from '@angular/forms'
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PictureService } from '../../services/picture.service'
import { QimgImage } from '../../models/qimgimage'
import { NavParams } from '@ionic/angular';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modify-place-modal',
  templateUrl: './modify-place-modal.component.html',
  styleUrls: ['./modify-place-modal.component.scss'],
})

export class ModifyPlaceModalComponent implements OnInit {
  @Input() placeToModify: any;

  message = "test pour voir si ça marche";
  id: string;
  name: string;
  description: string;
  location: any;
  tripId: string;
  trip: Trip;
  trips: Trip[];
  picture: QimgImage;
  pictureUrl: string;
  latitude: number;
  longitude: number;
  places: Place[];
  selectedPlace: any = {};
  user: User;
  componentFactoryResolver: any;
  


  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private toastController: ToastController, private tripService: TripService, private placeService: PlaceService, private pictureService: PictureService, private navParams: NavParams) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['placeId']
    this.selectedPlace = this.navParams.get('placeId')
  }

  ionViewWillEnter(): void { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  modifier(form: NgForm) {
    const urlSplit = window.location.href.split("/")
    const idPlace = urlSplit[urlSplit.length - 1]
    let { name, description } = form.value
    let picture = this.picture?.url
    if (form.valid) {
      this.placeService.modifyPlace({
        id: idPlace,
        name: name,
        description: description,
        location: {
          type: "Point",
          coordinates: [this.latitude, this.longitude]
        },
        pictureUrl: picture,
        tripId: this.tripId
      })
      this.modalCtrl.dismiss(null, 'modifier')
    } else {
      console.log('selectedPlace is not defined')
    }
  }

  async presentToast(position: 'top') {
  const toast = await this.toastController.create({
    message: 'Modification enregistrée !',
    duration: 3000,
    position: position
  });
  await toast.present();
  window.location.reload()
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail>;
  if (ev.detail.role === 'modifier') {
    this.message = `Modification enregistrée, ${ev.detail.data}!`;
  }
}

takePicture() {
  this.pictureService.takeAndUploadPicture().subscribe(data => {
    this.picture = data;
  });
}

}
