import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hopital } from '../model/hopital';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  private API_NAME = "rest/hopital/";
  constructor(private http:HttpClient) { }
  save(e: Hopital): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Hopital, id:number): Observable<Hopital> {
    return this.http.put<Hopital>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Hopital> {
    return this.http.get<Hopital>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Hopital[]> {
    return this.http.get<Hopital[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  updateInfo(hopital:Hopital):Observable<Hopital>{
    return this.http.put<Hopital>(URL_+this.API_NAME+"updateInfo",hopital);
  }
}
