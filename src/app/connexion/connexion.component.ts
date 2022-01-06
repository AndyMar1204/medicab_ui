import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminDataService } from '../data/admin-data.service';
import { Admin } from '../models/admin';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  errorMessage ='Identifiants invalides'
  invalidLogin = false
  public admin : Admin
  constructor(
    private auth:AuthenticationService,
    private router:Router,
    private adminDate:AdminDataService
  ) { }

  ngOnInit() {
    this.admin = new Admin()
  }
  connexion(adminLogin: NgForm){
    if(this.auth.authenticate(this.admin.number,this.admin.password)){
      console.log("connexion reussi")
      
      this.router.navigate([''])
    }else console.log("echec")
    
  }
}
