import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Account} from '../model/account';
import {DRIVER, HOPITAL, ID_ACCOUNT, ID_POSITION, NUMBER, PASSWORD, TYPE_ACCOUNT, USER} from '../outils';
import {DriverService} from '../services/driver.service';
import {HopitalService} from '../services/hopital.service';
import {UserService} from '../services/user.service';
import {BuildMessage} from "../build-message";
import {TypeMessage} from "../type-message";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BuildMessage implements OnInit {
  password = ''
  number = ''
  term = false
  typeAccount = sessionStorage.getItem(TYPE_ACCOUNT)
  constructor(private uServ: UserService,
    private route: Router,
    private hopServ:HopitalService,
    private drivServ:DriverService,
    private spinner:NgxSpinnerService) {
    super()
  }

  ngOnInit(): void {
  }
  connexion(form: NgForm) {
    if (form.valid) {
      this.spinner.show()
      this.uServ.signinByNumberAndPassword(this.number, this.password).subscribe(
        dat => {
          console.log(dat);
          switch (this.typeAccount) {
            case USER:
              this.uServ.checkExist(dat.id).subscribe(
                data => {
                  if (data === true) {
                    this.saveLogins(dat)
                    this.spinner.hide()
                  }else {
                    this.buildMessageModal("aucun compte utilisateur trouvé", TypeMessage.DANGER)

                  this.spinner.hide()
                }
                },
                err => {
                  this.buildMessageModal("impossible de se connecter au serveur", TypeMessage.DANGER)
                  this.spinner.hide()
                }
              )
              break;
            case DRIVER:
               this.drivServ.checkExist(dat.id).subscribe(
                data => {
                  if (data === true) {
                    this.saveLogins(dat)
                    this.spinner.hide()
                  }else {
                    this.buildMessageModal("aucun compte chauffeur trouvé",TypeMessage.DANGER)

                this.spinner.hide()}
                },
                err => {
                  this.buildMessageModal("impossible de se connecter au serveur", TypeMessage.DANGER)
                  this.spinner.hide()
                }
              )

              break;
              case HOPITAL:
                 this.hopServ.checkExist(dat.id).subscribe(
                data => {
                  if (data === true) {
                    this.saveLogins(dat)
                  }else alert("aucun compte hopital trouvé")
                },
                err => {
                  this.buildMessageModal("impossible de se connecter au serveur", TypeMessage.DANGER)
                  this.spinner.hide()
                }
              )
              this.spinner.hide()
                break;
            default:
              this.buildMessageModal("Choisissez un compte pour continuer", TypeMessage.DANGER)

              this.spinner.hide()
              break;
          }



        },
        err => {
          //alert("Impossible de se connecter, \n Reverifiez vos identifiants")
          this.buildMessageModal("".concat(err.error.erreur) , TypeMessage.DANGER)
          console.log(err);
          this.spinner.hide()
        }
      )
    }
  }
  setTypeAccount(type: string) {
    sessionStorage.setItem(TYPE_ACCOUNT, type)
    location.reload()
  }
  private saveLogins(dat: Account) {
    sessionStorage.setItem(NUMBER, dat.number)
    sessionStorage.setItem(PASSWORD, dat.password)
    sessionStorage.setItem(ID_POSITION, `${dat.position.id}`)
    sessionStorage.setItem(ID_ACCOUNT, `${dat.id}`)
    location.replace('/')
  }
  changeType(){
    sessionStorage.clear()
    location.reload()
  }
}
