import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urgence } from '../model/urgence';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class UrgenceService {
  private API_NAME = "rest/urgence/";
  constructor(private http:HttpClient) { }
  save(e: Urgence): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Urgence, id:number): Observable<Urgence> {
    return this.http.put<Urgence>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Urgence> {
    return this.http.get<Urgence>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Urgence[]> {
    return this.http.get<Urgence[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  getUrgences(){
    return this.http.get(URL_+"getAllUrgences")
  }
  saveUser(id_user:number, e: Urgence): Observable<Urgence> {
    return this.http.post<Urgence>(URL_+this.API_NAME + SAVE_+`/${id_user}`, e)
  }
  getAllUserUrgence(id_user:number){
    return this.http.get(URL_+this.API_NAME+`findAllByUser/${id_user}`);
  }
}
