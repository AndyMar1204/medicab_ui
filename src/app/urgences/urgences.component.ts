import {Component, OnInit} from '@angular/core';
import {UrgenceService} from '../services/urgence.service';
import {BuildMessage} from "../build-message";
import {TypeMessage} from "../type-message";
import {Urgence} from "../model/urgence";
import {UserService} from "../services/user.service";
import {User} from "../model/user";
import {ID_ACCOUNT} from "../outils";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-urgences',
  templateUrl: './urgences.component.html',
  styleUrls: ['./urgences.component.css']
})
export class UrgencesComponent extends BuildMessage implements OnInit {

  allTypesUrgence: string[] = []
  readonly selected = "selected"
  user!: User;
typeUrgence!:string
  constructor(
    private uServ: UrgenceService,
    private userServ: UserService,
    private route:Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadAllUrgences()
    this.loadUser()
  }

  loadUser() {
    this.userServ.findById(parseInt(sessionStorage.getItem(ID_ACCOUNT)!)).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.buildMessageModal("Impossible d'acceder à votre compte utilisateur",TypeMessage.WARNING)
        console.log(error)
      },

      () => {
        console.log("fin de traitement")
      }
    )
  }

  loadAllUrgences() {
    this.uServ.getUrgences().subscribe(
      data => {
        this.allTypesUrgence = data as string[]
        this.allTypesUrgence.sort()
      },
      err => {
        if (err.status == 0)
          this.buildMessageModal("Impssible d'acceder aux urgences, Verifiez votre connexion", TypeMessage.WARNING)
        else
          this.buildMessageModal("Une erreur s'est produite", TypeMessage.WARNING)
        console.log(err)
      }
    )
  }

  stringUp(mot: string) {
    return mot.replace('_', ' ').trim()
  }

  selectUrg(div_: string) {
    let div = document.getElementById(div_) as HTMLDivElement;
    let select = document.getElementsByClassName(this.selected)
    if (select.length > 0) {

      this.unselectUrg()
    }
    this.typeUrgence = div_;
    div.classList.add(this.selected)
    // console.log(div)
    // alert("le nom de l'urgence est " +div_ )
    div.classList.add("bg-danger-light")

  }

  unselectUrg() {
    let div = document.getElementsByClassName(this.selected)
    for (let i = 0; i < div.length; i++) {
      let di = div.item(i);
      if (di) {
        di.classList.remove(this.selected)
        di.classList.remove("bg-danger-light")
      }
    }
  }

  initUrgence() {
    let div = document.getElementsByClassName(this.selected)
    let btn_urg = document.getElementById('btn_urg') as HTMLButtonElement
    if (div.length == 0) {
      this.buildMessageModal("Veuiller choisir une urgence pour continuer", TypeMessage.WARNING)
    } else {
      btn_urg.click()
    }
  }

  onlineEmergency() {
    let urgence = new Urgence()

    urgence.typeUrgences=this.typeUrgence
    urgence.typeTransport = "Taxi"

    this.uServ.saveUser(this.user.id,urgence).subscribe(
      data=>{
        this.buildMessageModal("Votre urgence est "+data.etat.toLowerCase(), TypeMessage.SUCCESS)
        this.closeModal()
        setTimeout(
          ()=>{
            this.route.navigate(['myUrgence/' + `${data.id}`])
          },
          3000
        )
      },
      error => {
        this.buildMessageModal("Impossible de lancer l'urgence",TypeMessage.WARNING)
        console.log(error)
        this.closeModal()
      }
    )
  }
  closeModal(){
  let btn_modal = document.getElementById("btn-close") as HTMLButtonElement
    btn_modal.click();
  }
}
