import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NewPlaceModalComponent } from "./new-place-modal/new-place-modal.component";
import { NewTripModalComponent } from "./new-trip-modal/new-trip-modal.component";
import { ShowDescriptionModalComponent } from "./show-description-modal/show-description-modal.component";


@NgModule({
    declarations: [NewTripModalComponent, NewPlaceModalComponent, ShowDescriptionModalComponent],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalsModule { }