import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
   url ="http://localhost:8080/rest/admin"
   private admin : Admin
  constructor(private http: HttpClient) { }
  getAdminByUsernameAndPassword(username:String, password: String) : Admin{
    this.http.get<Admin>(this.url+`/getByNumberAndPassword/${username}/${password}`).subscribe(
      response => {
        this.admin = response;
      },error => {
        this.admin = null;
      }
    )
    return this.admin;
   }
}
