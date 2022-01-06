import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/data/user-data.service';
import { User } from 'src/app/models/user';
import { LocalisationService } from 'src/app/services/localisation.service';
import { SigninComponent } from 'src/app/signin/signin.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  admin_id = sessionStorage.getItem('admin_id')
  user_id : number 
  user = new User();
  constructor(private usrData : UserDataService, private signIn:SigninComponent) { }

  ngOnInit() {
    this.reload()
   
    
  }
  logout(){
this.signIn.logout()
location.reload()
  }
reload(){
  if(this.signIn.isUserLoggin){
    this.user_id = parseInt(sessionStorage.getItem('user_id'))
    this.usrData.getUserById(this.user_id).subscribe(
      response =>{
        //console.log(response)
        this.user = response
      }
    )
  }
}
}
