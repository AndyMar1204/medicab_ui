import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaure } from '../model/restaure';
import { URL_, CHECK_EXIST_BY_ID, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class ResetService{
  private API_NAME = "rest/reset/";
  constructor(private http: HttpClient) { }
  checkExist(id: number): Observable<Boolean> {
    throw new Error('Method not implemented.');
  }
  
  checkIfExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME + CHECK_EXIST_BY_ID+`${id}`)
  }
 
  save(t:Restaure): Observable<number> {
    return this.http.post<number>(URL_ +this.API_NAME + SAVE_, t)
  }
  update(t:Restaure): Observable<Restaure> {
    return this.http.put<Restaure>(URL_+this.API_NAME  + UPDATE_, t)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME  + DELETE_BY_ID + `${id}`)
  }
  findById(id: number): Observable<Restaure> {
    return this.http.get<Restaure>(URL_+this.API_NAME  + FIND_BY_ID + `${id}`)
  }
  findAll(): Observable<Restaure[]> {
    return this.http.get<Restaure[]>(URL_+this.API_NAME  + FIND_ALL)
  }
  etap1(email:string):Observable<Restaure>{
    return this.http.get<Restaure>(URL_+this.API_NAME+`etap_1/${email}`)
  }
  etap2(id:number,code:string):Observable<boolean>{
    return this.http.get<boolean>(URL_+this.API_NAME+`etap_2/${id}/${code}`)
  }
  etap3(id:number, password:string,confirm:string) : Observable<Boolean>{
    return this.http.get<boolean>(URL_+this.API_NAME+`etap_3/${id}/${password}/${confirm}`)
  }
}
