import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from '../model/adresse';
import { Hopital } from '../model/hopital';
import { ID_ACCOUNT, Outils, TYPE_ACCOUNT, URL_, USER } from '../outils';
import { HopitalService } from '../services/hopital.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hopitals',
  templateUrl: './hopitals.component.html',
  styleUrls: ['./hopitals.component.css']
})
export class HopitalsComponent implements OnInit {
  listHopital : Hopital[]=[]
  constructor(private hServ:HopitalService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.loadHopital()
  }
   private async loadHopital(){
    this.hServ.findAll().subscribe(
      data=>{
        this.listHopital= data;
        if(this.listHopital.length<1)
          alert('Aucun hopital disponible pour le moment')
      },err=>{
        console.log(err)
        alert("Impossible d'acceder à la liste des hopitaux")
      }
    )
 }
  viewHopital(id:number){
  this.router.navigate(['viewHopital/'+id])
 }
setUserHopital(hopital:Hopital){
   this.userService.findById(parseInt(sessionStorage.getItem(ID_ACCOUNT)!)).subscribe(
     data=>{
      this.userService.setUserHopital(data,hopital).subscribe(
        data_=>location.replace('viewHopital/'+`${hopital.id}`),
        err_=>console.log(err_)
      )
     },
     err=>console.log(err)
   )
 }
 isUserAccount(){
  if (sessionStorage.getItem(TYPE_ACCOUNT)===USER) {
    return true;

  }
  else return false
 }
 getImage(hop:Hopital):any{
    let url = URL_+"rest/files/"+hop.profil.name
    
   return url;
 }
 getAdresse(adresse:Adresse){
  return Outils.buildAdresse(adresse)
 }
}
