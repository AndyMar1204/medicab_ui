import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaure } from '../model/restaure';
import { ResetService } from '../services/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  email!: string
  code!: string

  pass1!: string
  pass2!: string
  pass3!: string
  pass4!: string
  constructor(private router: Router, private resetServ: ResetService) {
   
   }
  etap1: boolean = false
  etap2: boolean = false
  etap3: boolean = false
  restaure!: Restaure

  password!: string
  password_confirm!: string
  ngOnInit(): void {
    this.etap1 = true
  }
  goToEtap1(userForm: NgForm) {
    //this.etap1 = true
    console.log(this.email)
    this.resetServ.etap1(this.email).subscribe(
      data => {
        console.log(data)
        this.restaure = data

        if (data.id) {
          this.goToEtap2(this.restaure.id)
        }

      }, onErreur => this.buildMessageModal('cette adresse mail n\'existe pas')
    )

  }
  goToEtap2(id: number) {
    console.log(id)
    this.etap1 = false
    this.etap2 = true

  }
  goToEtap3() {
    this.etap1 = false
    this.etap2 = false
    this.etap3 = true
  }
  finish() {
    this.router.navigate(['/signin'])
  }
  submitEtap2() {
    let id = this.restaure.id
    let pass: string = this.pass1.trim().concat(this.pass2.trim().concat(this.pass3.trim().concat(this.pass4.trim())))
    //console.log(pass)
    this.resetServ.etap2(id, pass).subscribe(
      data => {
        console.log(data)
        if (data === true) {
          this.goToEtap3();
        }
        else alert('Mot de passe de restauration incorrect')
      }, onErreur => {
        console.log(onErreur)
      }
    )
  }
  submitEtap3() {
    let id = this.restaure.account.id
    console.log(this.password)
    console.log(this.password_confirm)
    if (this.password.match(this.password_confirm)) {
      this.resetServ.etap3(id, this.password, this.password_confirm).subscribe(
        data => {
          if (data === true)
            this.buildMessageModal("Mot de passe restauré avec success")
          else
            this.buildMessageModal("Erreur survenue lors de la restauration du mot de passe, reessayez plus tard")
          this.finish()
        }

      )
    }
    else this.buildMessageModal('Les deux mots de passe doivent etre  identiques')
  }
  buildMessageModal(msg:string){
    alert(msg)
  }
}
