import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxi } from '../models/taxi';
import { Crud } from './crud';

@Injectable({
  providedIn: 'root'
})
export class TaxiServiceService implements Crud<Taxi> {
url ="http://localhost:8080/rest/taxis/"
  constructor(private http:HttpClient) { }
  findAll(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(this.url+`getAll`)
  }
  findById(id: number): Observable<Taxi> {
    return this.http.get<Taxi>(this.url+`get/${id}`)
  }
  update(t: Taxi, id: number): Observable<Taxi> {
   return this.http.put<Taxi>(this.url+`update/${id}`,t)
  }
  save(t: Taxi): Observable<Taxi> {
    return this.http.post<Taxi>(this.url+`save`,t)
  }
  delete(id: number): Observable<Taxi> {
    return this.http.delete<Taxi>(this.url+`delete/${id}`)
  }
}
