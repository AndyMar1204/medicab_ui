import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { Adresse } from '../model/adresse';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_NAME = "rest/account/";
  constructor(private http:HttpClient) { }

  save(e: Account): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Account, id:number): Observable<Account> {
    return this.http.put<Account>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Account> {
    return this.http.get<Account>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  signinByNumberAndPassword(number:string,password:string):Observable<Account>{
    return this.http.get<Account>(URL_+"connexion/"+`${number}/`+`${password}`)
  }
  uploadProfil(file:File, id:number){
    if(file){
     
      const formData = new FormData();
      formData.append("file",file);
      const upload$ = this.http.post(URL_+"rest/files/profil/"+`${id}`,formData)
      return upload$
      }
      else throw new Error("Erreur de televersement");  
  }
  getFileByName(name:String):Observable<Blob>{
    return this.http.get(URL_+"rest/files/"+`${name}`,{responseType:'blob'})
  }
  updateAdresse(id:number, adresse:Adresse):Observable<Adresse>{
    return this.http.post<Adresse>(URL_+this.API_NAME+"updateAdresse/"+`${id}`,adresse)
  }
  getAllTypeTrans():Observable<string[]>{
    return this.http.get<string[]>(URL_+"getAllTypesTrans")
  }
  updateInfo(account:Account){
    return this.http.put<Account>(URL_+'rest/account/updateAccount',account)
  }
}
