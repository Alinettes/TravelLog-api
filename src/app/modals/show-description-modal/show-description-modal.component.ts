import { Component, Input, OnInit } from '@angular/core';

import { PlaceService } from '../../services/place.service'
import { Place } from '../../models/place'

import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-show-description-modal',
  templateUrl: './show-description-modal.component.html',
  styleUrls: ['./show-description-modal.component.scss'],
})



export class ShowDescriptionModalComponent implements OnInit {

  
  @Input() public place;

  places: Place[];
  selectedPlaces: Place;

  constructor(private modalCtrl: ModalController, private placeService: PlaceService) {  }

  ngOnInit() { 

    console.log(this.place)
    this.placeService.getPlaces().subscribe(place => {
          this.places = place;
          //console.log(this.places)
          this.places.forEach(place => {

                
          this.selectedPlaces = place;
                
                // console.log(this.selectedPlaces)
              }
        )})


    // console.log(this.selectedPlaces)
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // confirm() {
  //   return this.modalCtrl.dismiss(this.name, 'confirm');
  // }

  // select(){
  //   this.placeService.getPlaces().subscribe(place => {
  //     this.places = place;
  //     //console.log(this.places)
  //     this.places.forEach(place => {

        
  //           this.selectedPlaces = place;
            
  //         }
  //   )})
          
      
      
  // }
  }


