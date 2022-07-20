import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from '../model/account';
import { Adresse } from '../model/adresse';
import { Driver } from '../model/driver';
import { FileInfo } from '../model/file-info';
import { Hopital } from '../model/hopital';
import { User } from '../model/user';
import { TYPE_ACCOUNT, ID_ACCOUNT, URL_, USER, DRIVER, HOPITAL, Outils, GROUP_SANGUIN } from '../outils';
import { AccountService } from '../services/account.service';
import { DriverService } from '../services/driver.service';
import { HopitalService } from '../services/hopital.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id_profil = parseInt(sessionStorage.getItem(ID_ACCOUNT)!)
  typeAccount = sessionStorage.getItem(TYPE_ACCOUNT)
  user!: User
  driver!: Driver
  hopital!: Hopital
  account!: Account
  groupSanguins= GROUP_SANGUIN
  constructor(
    private uService: UserService,
    private dService: DriverService,
    private hService: HopitalService,
    private http: HttpClient,
    private accService:AccountService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadAccount()
    this.typeAccount
  }
  loadAccount() {
    this.spinner.show()
    this.http.get<Account>(URL_ + `rest/account/findById/${this.id_profil}`).subscribe(
      dat => {
        this.account = dat
        switch (this.typeAccount!) {
          case USER:
            this.user = dat as User
            break;
          case DRIVER:
            this.driver = dat as Driver
            break;
          case HOPITAL:
            this.hopital = dat as Hopital
            break;
          default:
            alert('Type de compte indirect')
            break;
        }
        this.spinner.hide()
      },
      err => console.log(err)

    )
  }
  getAdresse(ad:Adresse){
    return Outils.buildAdresse(ad)
  }
  getProfil(pr:FileInfo){
    return URL_ + "rest/files/" + `${pr.name}`
  }
  file!: File;
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  uploadProfil() {
    this.spinner.show()
    this.accService.uploadProfil(this.file, this.account.id)?.subscribe(
      
      data => {
       location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }
  updateAdresse(){
    this.spinner.show()
    this.http.put<Adresse>(URL_+"updateAdresse",this.account.adresse).subscribe(
      dat=>{
        this.account.adresse = dat

        alert("enregistrement reussie") 
        this.spinner.hide()
      },
      err=>{console.log(err) 
        alert("Echec d'enregitrement")
      this.spinner.hide()
    }
      
    )
  }
  updateInfo(){
    this.spinner.show()
    this.accService.updateInfo(this.account).subscribe(
      data=>{
        this.account = data
        alert("Enregistrement reussi")
        this.spinner.hide()
      },
      err =>{console.log(err)
      alert("Echec d'enregistrement")
      this.spinner.hide()
      }
      
    )
  }
  updateUser(){
    this.spinner.show()
    console.log(this.user)
    
    this.uService.updateInfo(this.user, this.user.id).subscribe(
      dat=>{
        this.user = dat
        alert('Mise à jour reussie')
        this.spinner.hide()
      },
      err=>console.log(err)
    )
  }
  updateHopitalInfo(){
    this.spinner.show()
    this.hService.update(this.hopital, this.hopital.id).subscribe(
      dat=>{
        this.hopital = dat
        alert('Mise à jour reussie')
        this.spinner.hide()
      },
      err=>console.log(err)
    )
  }
}

