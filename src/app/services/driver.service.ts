import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../model/driver';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private API_NAME = "rest/driver/";
  constructor(private http:HttpClient) { }
  save(e: Driver): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Driver, id:number): Observable<Driver> {
    return this.http.put<Driver>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Driver> {
    return this.http.get<Driver>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
  updateInfos(driver:Driver):Observable<Driver>{
    return this.http.put<Driver>(URL_+this.API_NAME+"updateInfo",driver)
  }
}
