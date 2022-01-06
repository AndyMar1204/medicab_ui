import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGardService implements CanActivate{

  constructor(private router : Router, private signIn : SigninComponent) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.signIn.isUserLoggin()){
      return true
    }else{
      this.router.navigate(['signin'])
      return false
    }
  }
}
