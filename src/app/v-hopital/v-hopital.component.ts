import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adresse } from '../model/adresse';
import { FileInfo } from '../model/file-info';
import { Hopital } from '../model/hopital';
import { Outils, URL_ } from '../outils';
import { HopitalService } from '../services/hopital.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-v-hopital',
  templateUrl: './v-hopital.component.html',
  styleUrls: ['./v-hopital.component.css']
})
export class VHopitalComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private hopServ: HopitalService,
    private userService:UserService) { }
 id_!: number
  hopital: Hopital = new Hopital()
  ngOnInit(): void {
     let id = this.route.snapshot.params['id']
    this.id_ = parseInt(id)
    if (!this.id_)
      alert("L'identifiant d'un hopital doit etre un nombre")
    else {
      this.loadHopital(this.id_)
    }
    
  }
  getAdresse(ad:Adresse){
    return Outils.buildAdresse(ad)
  }
async loadHopital(id: number) {
    this.hopServ.findById(id).subscribe(
      data => {
        this.hopital = data
        console.log(data)
      },
      err => {
        if (err.status === 0)
          alert("Impossible de se connecter au serveur")
        else
          alert(err.error.erreur)
        console.log(err)
      }
    )
  }
   getProfil(pr:FileInfo){
    return URL_ + "rest/files/" + `${pr.name}`
  }
}
