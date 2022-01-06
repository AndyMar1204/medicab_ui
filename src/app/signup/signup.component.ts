import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../data/user-data.service';
import { Position } from '../models/position';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public password_repeat: string;
  public number: string;
  
  public position = new Position();
  public user = new User();
  public messageModal: string;
  public displayMessageModal: boolean = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private serv: UserDataService) { }

  ngOnInit() {
  }
  private saveUser(user: User) {
    console.log(this.serv.saveUser(user))
    
    this.serv.saveUser(user).subscribe(
      (result: User) => {
        this.router.navigate(["signin"])
      },
      error => {
        console.log(error)
      /*  if(error instanceof HttpErrorResponse)
        this.buildMessageModal('Une erreur est survenue lors de l\'enregistrement, \n Veuillez ressayez dans un instant '.concat(error.name));
        else
        this.buildMessageModal('Une erreur est survenue lors de l\'enregistrement, \n Veuillez ressayez dans un instant '); */
      if (error.status ===500) {
        this.buildMessageModal('Numero de telephone ou adresse mail est deja utilisé');
      } else {
        this.buildMessageModal('Une erreur est survenue lors de l\'enregistrement, \n Veuillez ressayez dans un instant ');
      }
      
      }
    )

  }
  public handleSuccessfullRespons(response) {
    console.log(response);

    this.user = response
    return this.user;
  }
  public addUser(addUserForm: NgForm) {
    if (!addUserForm.valid) {
      console.log("Une erreur s'est produite")
    } else {
      if (this.user.id === 0 || this.user.id == null) {
        if (this.user.password !== this.password_repeat) {
          this.buildMessageModal('les mots de passe doivent etre identiques')
          return
        } else
          this.saveUser(this.user)
      } else {
        console.log("mise à jour")
        // this.updateUser(this.user, this.id)  
      }
    }
    /*  */

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
