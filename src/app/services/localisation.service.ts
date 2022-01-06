import { Injectable } from '@angular/core';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  constructor() { }
  getLivePosition(): Position {
    var myPosition= new Position()
    navigator.geolocation.getCurrentPosition((position) => {
       
      myPosition.latitude = position.coords.latitude;
      myPosition.longitude = position.coords.longitude;
      console.log(position.coords)
      return myPosition;
    }, (error) => {
      // check if the user denied geolocation, or if there was any other problem
      if (error.code == error.PERMISSION_DENIED) {
        alert('La geolocalisation a ete desactivée \n Reverifiez vos parametres');
      } else {
        alert('Impossible de trouver votre position, Ressayez apres.');
      }
    })
    return myPosition;
  }
}
