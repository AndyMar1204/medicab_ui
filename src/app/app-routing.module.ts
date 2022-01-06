import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { ResetComponent } from './reset/reset.component';
import { RouteGuardService } from './services/route-guard.service';
import { UserRouteGardService } from './services/user-route-gard.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StatComponent } from './stat/stat.component';
import { TaxisComponent } from './taxis/taxis.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component : HomeComponent, canActivate:[UserRouteGardService]},
  {path: 'myprofil', component : ProfilComponent, canActivate:[UserRouteGardService]},
  {path: 'admin', component : StatComponent,canActivate:[RouteGuardService]},
  {path: 'admin/users', component : UsersComponent,canActivate:[RouteGuardService]},
  {path: 'admin/connexion', component : ConnexionComponent},
  {path: 'admin/addUser', component : AddUserComponent,canActivate:[RouteGuardService]},
  {path: 'admin/addUser/:id', component : AddUserComponent,canActivate:[RouteGuardService]},
  {path: 'admin/updateUser/:id', component : AddUserComponent,canActivate:[RouteGuardService]},
  {path: 'admin/taxis', component : TaxisComponent,canActivate:[RouteGuardService]},
  {path: 'signup', component : SignupComponent},
  {path: 'signin', component : SigninComponent},
  {path: 'reset', component : ResetComponent},


  {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
