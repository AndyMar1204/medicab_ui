import { Injectable } from '@angular/core';
import { AdminDataService } from '../data/admin-data.service';
import { UserDataService } from '../data/user-data.service';
import { Admin } from '../models/admin';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private admin: Admin
  private user: User
  constructor(private admData: AdminDataService, private uServ:UserDataService) { }
  public authenticate(number: string, password: string): boolean {

    this.admin = this.admData.getAdminByUsernameAndPassword(number, password);
    if (this.admin) {
      sessionStorage.setItem("admin_id", this.admin.id.toString())
      return true
    } else return false
  }
  isAdminLogin() {
    let admin_id = sessionStorage.getItem("admin_id")
    return !(admin_id === null)
  }
  logout() {
    sessionStorage.removeItem("admin_id")
  }
}
