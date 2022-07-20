import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NUMBER, PASSWORD } from '../outils';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private rout:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   let number = sessionStorage.getItem(NUMBER)
   let password = sessionStorage.getItem(PASSWORD)
   if (number!=null && password !=null)   {
    return true
   }
   else{
    this.rout.navigate(['/signin'])
return false
   }
   
  }
}
