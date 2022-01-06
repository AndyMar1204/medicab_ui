import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../models/position';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url ="http://localhost:8080/rest/users"
  constructor(private http: HttpClient) { }
  public getAllUsers(){
    
    return this.http.get<User[]>(this.url+`/getAll`)
    
  }
  public getUserById(id:number){
    return this.http.get<User>(this.url+`/getUser/${id}`)
  }
  public saveUser(user:User){
    return this.http.post<User>(this.url+`/addUser`,user)
  }
  public updateUser(user:User,id:number){
    return this.http.put(this.url+`/update/${id}`,user)
  }
  public deleteUser(id:number){
    return this.http.delete(this.url+`/deleteUser/${id}`)
  }
  public signUser(user:User){
    return this.http.post<User>(this.url+`/signIn`,user)
  }
  public updateIdentity(id:number, user:User){
    return this.http.put(this.url+`/updateIdentity/${id}`,user)
  }
  public updatePosition(id:number, position:Position){
    return this.http.put(this.url+`/updatePosition/${id}`,position)
  }
}
