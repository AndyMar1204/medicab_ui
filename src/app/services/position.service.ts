import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../model/position';
import { URL_, SAVE_, UPDATE_, DELETE_BY_ID, FIND_BY_ID, FIND_ALL, CHECK_EXIST_BY_ID } from '../outils';
 

@Injectable({
  providedIn: 'root'
})
export class PositionService  {
  private API_NAME = "rest/position/";
  constructor(private http:HttpClient) { }
  save(e: Position): Observable<number> {
    return this.http.post<number>(URL_+this.API_NAME + SAVE_, e)
  }
  update(e: Position, id:number): Observable<Position> {
    return this.http.put<Position>(URL_+this.API_NAME+UPDATE_+`${id}`,e)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(URL_+this.API_NAME+DELETE_BY_ID+`${id}`)
  }
  findById(id: number): Observable<Position> {
    return this.http.get<Position>(URL_+this.API_NAME+FIND_BY_ID+`${id}`)
  }
  findAll(): Observable<Position[]> {
    return this.http.get<Position[]>(URL_+this.API_NAME+FIND_ALL)
  }
  checkExist(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(URL_+this.API_NAME+CHECK_EXIST_BY_ID+`${id}`)
  }
}
