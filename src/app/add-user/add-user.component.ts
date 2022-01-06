import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../data/user-data.service';
import { Position } from '../models/position';
import { User } from '../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
public user: User
id:number
username:string
password:string
number:number
email:string
position :Position
  constructor(private router: Router,
    private route: ActivatedRoute,
    private serv: UserDataService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    if(this.route.snapshot.params['id']){
     
       this.serv.getUserById(this.id).subscribe(
        data =>{
          console.log(data)
          this.user= data
        }, 
        error =>{
          this.router.navigate(['addUser'])
        }
      ) 
    }else{
      this.user = new User()
      console.log("new user")
    }
  }
  public saveOrUpdateUser(addUserForm: NgForm) {
    if (!addUserForm.valid) {
      console.log("Une erreur s'est produite")
    } else {
      if (this.user.id === 0 || this.user.id == null) {
        console.log("debut enregistrement")
        this.saveUser(this.user)
        this.router.navigate(["users"])
      } else {
        console.log("mise à jour")
         this.updateUser(this.user, this.id)  
      }
    }
    /*  */

  }
  private saveUser(user: User) {
    console.log(this.serv.saveUser(user))
    this.serv.saveUser(user).subscribe(
      response => this.handleSuccessfullRespons(response)
    )

  }
  private updateUser(user:User, id : number){
    
    this.serv.updateUser(user,id).subscribe(
      respone =>{
        console.log(respone)
        this.router.navigate(["users"])
      }
    )
    
  }
  public handleSuccessfullRespons(response) {
    console.log(response);

    this.user=response
  }
}
