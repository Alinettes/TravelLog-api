import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NewPlaceModalComponent } from "./new-place-modal/new-place-modal.component";
import { NewTripModalComponent } from "./new-trip-modal/new-trip-modal.component";

@NgModule({
    declarations: [NewTripModalComponent, NewPlaceModalComponent],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalsModule { }