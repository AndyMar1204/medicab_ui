
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../data/user-data.service';
import { User } from '../models/user';
import { LocalisationService } from '../services/localisation.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SigninComponent implements OnInit {
  public number:number;
  public password:string;
  public user = new User();
  public messageModal: string;
  public displayMessageModal: boolean = false;
  public saveConnexion : boolean;
  constructor(private router: Router,
    private route: ActivatedRoute,private serv: UserDataService, private locServ:LocalisationService) { }

  ngOnInit() {
    this.saveConnexion=false
    var user_id = localStorage.getItem('user_id')
    if(user_id!==null){
      sessionStorage.setItem('user_id',localStorage.getItem('user_id'))
      
    }
    if(this.isUserLoggin()){
      this.user.position = this.locServ.getLivePosition()

      console.log(this.user.position)
      this.serv.updatePosition(parseInt(sessionStorage.getItem('user_id')) , this.user.position).subscribe(
        response =>{
          console.log(response)
        }
      )
      this.router.navigate([''])
    }
  }
  public signUser(signinForm: NgForm){
    console.log(this.saveConnexion)
    if(!signinForm.valid){
      this.buildMessageModal("Entrez les identifiants valides")
    }else{
      
      this.serv.signUser(this.user).subscribe(
        response =>{
          if(this.saveConnexion){
            localStorage.setItem('user_id',response.id.toString())
          }
          sessionStorage.setItem('user_id',response.id.toString())
          location.reload()
          this.router.navigate([''],)
        }, 
        error=>{
          console.log(error)
          this.buildMessageModal("Mot de passe ou nom d'utilisateur incorrect")
        }
        
      )
    }
  }
  isUserLoggin(){
    let user_id = sessionStorage.getItem('user_id')
    this.serv.getUserById(parseInt(sessionStorage.getItem('user_id'))).subscribe(
     response => this.user= response

    )
    return !(user_id === null)
  }

  logout(){
    sessionStorage.removeItem('user_id')
    localStorage.removeItem('user_id')
  }
  /**
 * Construit le message à afficher suite à une action utilisateur.
 * @param msg 
 */
   buildMessageModal(msg: string) {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }

}
