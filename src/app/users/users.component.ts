import { Component, OnInit } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';

import { UserDataService } from '../data/user-data.service';
import { User } from '../models/user';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public allUsers:User[]
  constructor(private serv:UserDataService,
    private router : Router) { }

  ngOnInit() {
    this.getAllUsers();
  
    
  }
 
getAllUsers(){
  return this.serv.getAllUsers().subscribe(
    response => this.allUsers = response
  );
}
updateUser(id:number){
  this.router.navigate(['updateUser/'+id])
 
}
deleteUser(id:number){
  this.serv.deleteUser(id).subscribe(
    response=>{
     location.reload()
    },
    error=>{
      this.router.navigate(['error/'])
    }
  )

  }

}

