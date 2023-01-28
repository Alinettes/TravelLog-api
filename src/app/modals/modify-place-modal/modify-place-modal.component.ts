import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { TripService } from '../../services/trip.service'
import { Trip } from '../../models/trip'
import { Place } from 'src/app/models/place';
import { User } from 'src/app/models/user';
import { OverlayEventDetail } from '@ionic/core/components';
import { NgForm } from '@angular/forms'
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PictureService } from '../../services/picture.service'
import { QimgImage } from '../../models/qimgimage'
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-modify-place-modal',
  templateUrl: './modify-place-modal.component.html',
  styleUrls: ['./modify-place-modal.component.scss'],
})

export class ModifyPlaceModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal
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
  place: Place;
  places: Place[];
  user: User;
  //name: any= {};
  //tripId:any= {}


  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private toastController: ToastController, private tripService: TripService, private placeService: PlaceService, private pictureService: PictureService) {
    //this.name.content = "Place de la Bastille"
  }

  ngOnInit() { }

  ionViewWillEnter(): void { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  modifier(form: NgForm) {
    let { name, description, tripId } = form.value
    let picture = this.picture.url
    let id = this.place.id
    console.log("L'id du lieu est: " + id)
    if (form.valid && this.placeToModify === undefined) {
      let oneLocation = {
        type: "Point",
        coordinates: [this.latitude, this.longitude]
      }

      this.placeService.modifyPlace({
        id: id,
        name: name,
        description: description,
        location: oneLocation,
        pictureUrl: picture,
        tripId: tripId
      })
      console.log("Lieu id : " + this.id)
      this.modalCtrl.dismiss()

    }
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Modification enregistrée !',
      duration: 3000,
      position: position
    });
    await toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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
