import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../model/doctor';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class DoctorService  {

 private API_NAME = "rest/doctors/";
  constructor(private http:HttpClient) { }
  save(e: Doctor): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(URL_+this.API_NAME+UPDATE_,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  updateInfos(Doctor:Doctor):Observable<Doctor>{
    return this.http.put<Doctor>(URL_+this.API_NAME+"updateInfo",Doctor)
  }
}
