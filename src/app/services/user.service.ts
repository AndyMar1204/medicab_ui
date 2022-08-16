import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { Doctor } from '../model/doctor';
import { Hopital } from '../model/hopital';
import { User } from '../model/user';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private API_NAME = "rest/users/";

  constructor(private http:HttpClient) { }
  save(e: User): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: User, id:number): Observable<User> {
    return this.http.put<User>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<User> {
    return this.http.get<User>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  updateInfo(e: User, id:number): Observable<User> {
    return this.http.post<User>(URL_+this.API_NAME+'updateInfo/'+`${id}`,e)
  }
  addUserDoctor(user:User,doctor:Doctor){
    return this.http.post<Doctor>(URL_+this.API_NAME+'addUserDoctor/'+`${user.id}`,doctor);
  }
  setUserHopital(user:User,hopital:Hopital){
    return this.http.get(URL_+this.API_NAME+"setUserHopital/"+`${user.id}`+"/"+`${hopital.id}`)
  }
  signin(number:string, password:string){

  }
    signinByNumberAndPassword(number:string,password:string):Observable<Account>{
    return this.http.get<Account>(URL_+"connexion/"+`${number}/`+`${password}`)
  }
  signinByNumberAndHashedPassword(number:string,passwordHashed:string):Observable<Account>{
    return this.http.get<User>(URL_+`connexionSecure/${number}/${passwordHashed}`)
  }
}
