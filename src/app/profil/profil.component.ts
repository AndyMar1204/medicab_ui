import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../data/user-data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user : User
  constructor(private usrDate:UserDataService) { }

  ngOnInit() {
    let user_id = parseInt(sessionStorage.getItem('user_id'))
    this.usrDate.getUserById(user_id).subscribe(
      response=>{
        this.user = response
      }
    )
  }
  updateIdentity(identity:NgForm){

  }

}
