import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Account} from '../model/account';
import {Driver} from '../model/driver';
import {Hopital} from '../model/hopital';
import {User} from '../model/user';
import {DRIVER, HOPITAL, TYPE_ACCOUNT, USER} from '../outils';
import {DriverService} from '../services/driver.service';
import {HopitalService} from '../services/hopital.service';
import {UserService} from '../services/user.service';
import {BuildMessage} from "../build-message";
import {TypeMessage} from "../type-message";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent extends BuildMessage implements OnInit {

  constructor(private userServ: UserService, private route: Router,
              private drivServ: DriverService,
              private hopServ: HopitalService,
              private spinner: NgxSpinnerService) {
    super()
  }

  account = new Account()
  confirm = ''
  term: boolean = false

  typeAccount = sessionStorage.getItem(TYPE_ACCOUNT)

  ngOnInit(): void {

  }

  add(userForm: NgForm) {

    if (userForm.valid) {
      this.spinner.show()
      console.log(this.typeAccount)
      switch (this.typeAccount) {
        case USER:
          let user = this.account as User
          this.userServ.save(user).subscribe(
            dat => {
              alert("inscription reussi")
              this.route.navigate(['/signin'])
              this.spinner.hide()
            },
            err => {
              if (err.status ===0){
                this.buildMessageModal("Impossible de se connecter au serveur", TypeMessage.DANGER)

              }else {
                this.buildMessageModal("".concat(err.error.erreur), TypeMessage.DANGER)

              }
              console.log(err)
              this.spinner.hide()
            }
          )
          break;
        case DRIVER:
          let driver = this.account as Driver
          this.drivServ.save(driver).subscribe(
            dat => {
              this.spinner.hide()
              alert("inscription reussi")
              this.route.navigate(['/signin'])
            },
            err =>  {
              this.buildMessageModal("".concat(err.error.erreur), TypeMessage.DANGER)
              console.log(err)
              this.spinner.hide()
            }
          )
          break;
        case HOPITAL:
          let hop = this.account as Hopital
          this.hopServ.save(hop).subscribe(
            dat => {
              this.spinner.hide()
              alert("inscription reussi")
              this.route.navigate(['/signin'])
            },
            err =>  {
              this.buildMessageModal("".concat(err.error.erreur), TypeMessage.DANGER)
              console.log(err)
              this.spinner.hide()
            }
          )
          break;
        default:
          this.buildMessageModal("Veuillez choisir un compte pour continuer", TypeMessage.DANGER)
          sessionStorage.clear()
          break;
      }
    } else {
      this.buildMessageModal("formulaire contient des erreurs", TypeMessage.DANGER)
    }
  }

  setTypeAccount(type: string) {
    sessionStorage.setItem(TYPE_ACCOUNT, type)
    location.reload()
  }

  changeType() {
    sessionStorage.clear()
    location.reload()
  }
}
