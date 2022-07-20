import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fichier } from '../models/fichier';
import { CHECK_EXIST_BY_ID, Crud, DELETE_BY_ID, FIND_ALL, FIND_BY_ID, SAVE_, UPDATE_, URL_ } from './crud';

@Injectable({
  providedIn: 'root'
})
export class FichierService implements Crud<Fichier,number>{
  private API_NAME = "rest/fichier/";
  constructor(private http:HttpClient) { }
  save(e: Fichier): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Fichier, id:number): Observable<Fichier> {
    return this.http.put<Fichier>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Fichier> {
    return this.http.get<Fichier>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
}
