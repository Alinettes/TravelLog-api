import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms'
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-new-trip-modal',
  templateUrl: './new-trip-modal.component.html',
  styleUrls: ['./new-trip-modal.component.scss'],
})
export class NewTripModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = "test pour voir si ça marche";
  titre: string;
  description: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ajouter(form: NgForm) {
    if (form.valid) {
      this.modal.dismiss(this.titre, 'ajouter');
      this.modal.dismiss(this.description, 'ajouter');
      console.log(this.titre, this.description)
      this.modalCtrl.dismiss()
    }
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
