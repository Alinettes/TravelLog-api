import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NgForm } from '@angular/forms'


@Component({
  selector: 'app-new-place-modal',
  templateUrl: './new-place-modal.component.html',
  styleUrls: ['./new-place-modal.component.scss'],
})

export class NewPlaceModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message= "test pour voir si ça marche";
  titre: string;
  displayedTitre: string;
  description: string;
  localisation: string;

  constructor(private modalCtrl: ModalController, private toastController: ToastController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ajouter(form: NgForm) {
    if (form.valid) {
    this.modal.dismiss(this.titre, 'ajouter');
    this.modal.dismiss(this.description, 'ajouter');
    this.modal.dismiss(this.localisation, 'ajouter');
    console.log(this.titre, this.description, this.localisation)
    this.modalCtrl.dismiss()
    }
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Nouveau lieu ajouté !',
      duration: 1500,
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
