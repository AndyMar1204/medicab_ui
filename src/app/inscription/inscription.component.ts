import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from '../model/account';
import { Driver } from '../model/driver';
import { Hopital } from '../model/hopital';
import { User } from '../model/user';
import { DRIVER, HOPITAL, TYPE_ACCOUNT, USER } from '../outils';
import { DriverService } from '../services/driver.service';
import { HopitalService } from '../services/hopital.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private userServ:UserService,private route:Router,
    private drivServ:DriverService,
    private hopServ:HopitalService, 
    private spinner:NgxSpinnerService) { }
  account = new Account()
  confirm=''
  term:boolean = false

  typeAccount = sessionStorage.getItem(TYPE_ACCOUNT)
  ngOnInit(): void {

  }
  add(userForm:NgForm){
   
    if (userForm.valid) {
       this.spinner.show()
      console.log(this.typeAccount)
      switch (this.typeAccount) {
        case USER:
         let user = this.account as User 
         this.userServ.save(user).subscribe(
          dat=>{
            alert("inscription reussi")
            this.route.navigate(['/signin'])
            this.spinner.hide()
          },
          err=>console.log(err)
          
         )
         break;
        case DRIVER:
          let driver = this.account as Driver 
         this.drivServ.save(driver).subscribe(
          dat=>{
            this.spinner.hide()
            alert("inscription reussi")
            this.route.navigate(['/signin'])
          },
          err=>console.log(err)
          )
        break;
        case HOPITAL:
          let hop = this.account as Hopital
         this.hopServ.save(hop).subscribe(
          dat=>{
            this.spinner.hide()
            alert("inscription reussi")
            this.route.navigate(['/signin'])
          },
          err=>console.log(err)
          )
          break;
        default:
          alert("Choisissez un type de compte pour continuer")
          sessionStorage.clear()
          break;
      }
    }else{
      alert("Formulaire contient des erreurs")
    }
  }
   setTypeAccount(type:string){
    sessionStorage.setItem(TYPE_ACCOUNT,type)
    location.reload()
  }
  changeType(){
    sessionStorage.clear()
    location.reload()
  }
}
