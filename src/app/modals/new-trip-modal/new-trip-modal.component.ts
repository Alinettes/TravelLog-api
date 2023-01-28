import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms'
import { OverlayEventDetail } from '@ionic/core/components';
import { TripService } from 'src/app/services/trip.service';


@Component({
  selector: 'app-new-trip-modal',
  templateUrl: './new-trip-modal.component.html',
  styleUrls: ['./new-trip-modal.component.scss'],
})
export class NewTripModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = "test pour voir si ça marche";
  title: string;
  description: string;

  constructor(private modalCtrl: ModalController, private toastController: ToastController, private tripService: TripService) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ajouter(form: NgForm) {
    if (form.valid) {
      this.modal.dismiss(this.title, 'ajouter');
      this.modal.dismiss(this.description, 'ajouter');
      console.log(this.title, this.description)
      this.tripService.createTrip({
        title: this.title,
        description: this.description,
      }).subscribe((response) => {
        console.log(response)
      },
        (error) => {
          console.log(error)
        });
      this.modalCtrl.dismiss()
    }
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Nouveau voyage créé !',
      duration: 3000,
      position: position
    });
    await toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log("test1")
    if (ev.detail.role === 'ajouter') {
      console.log("Test 2")
      this.message = `Nouveau lieu ajouté, ${ev.detail.data}!`;
      console.log("Test 3")
    }
  }

}
