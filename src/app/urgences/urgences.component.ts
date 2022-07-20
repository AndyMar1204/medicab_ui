import { Component, OnInit } from '@angular/core';
import { UrgenceService } from '../services/urgence.service';

@Component({
  selector: 'app-urgences',
  templateUrl: './urgences.component.html',
  styleUrls: ['./urgences.component.css']
})
export class UrgencesComponent implements OnInit {

  constructor(private uServ:UrgenceService) { }
allTypesUrgence: string[]=[]
  ngOnInit(): void {
    this.loadAllUrgences()
  }
 loadAllUrgences(){
    this.uServ.getUrgences().subscribe(
      data=>{
        this.allTypesUrgence= data as string[]
      },
      err=>{
        if (err.status == 0)
    alert("Impossible d'acceder aux urgences, Verifiez votre connexion")
        else
          alert("Une erreur s'est produite")
        console.log(err)
      }
    )
  }
  stringUp(mot: string) {
    return mot.replace('_', ' ').trim()
  }
}
