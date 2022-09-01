import { Injectable } from "@angular/core"
import { Adresse } from "./model/adresse"
import {CookieService} from "ngx-cookie";

@Injectable({
    providedIn: 'root'
})
export class Outils {
    isLogin() {
        if (sessionStorage.getItem(NUMBER) && sessionStorage.getItem(PASSWORD)) {
            return true
        } else
            return false
    }
    public static buildAdresse(a:Adresse){
        return `N° : ${a.numero}, ${a.avenue} - ${a.quartier}, ${a.commune} - ${a.ville}, ${a.province}`;
    }
    public static logout(cookie:CookieService){
      cookie.removeAll()
      sessionStorage.clear()
      location.reload()
    }
}
export const USERNAME = 'username'
export const EMAIL = 'emeil'
export const PASSWORD = 'password'
export const NUMBER = 'number'
export const URL_ ="http://localhost:5000/"
export const URL__ = "https://medicab-back-app.herokuapp.com/"
export const URL___ ="http://apimedicabv1-env.eba-xjzxxvit.us-east-1.elasticbeanstalk.com/"
export const SAVE_= "save"
export const UPDATE_ = "update/"
export const FIND_BY_ID = "findById/"
export const DELETE_BY_ID = "deleteById/"
export const FIND_ALL = "findAll"
export const CHECK_EXIST_BY_ID = "checkExist/"
export const TYPE_ACCOUNT = "typeAccount"
export const USER = "user"
export const DRIVER = "driver"
export const HOPITAL = "hopital"
export const ID_POSITION = "id_position"
export const ID_ACCOUNT = "id_account"
export const GROUP_SANGUIN = ["O+","O-","A+","A-","B+","B-","AB+","AB-","Hh","Inconnu"]
export const ACCOUNT_COOKIES = "account_cookie"
