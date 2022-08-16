import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { ErrComponent } from './err/err.component';
import { HopitalsComponent } from './hopitals/hopitals.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MapsComponent } from './maps/maps.component';
import { MyUrgenceComponent } from './my-urgence/my-urgence.component';
import { ProfilComponent } from './profil/profil.component';
import { ResetComponent } from './reset/reset.component';
import { RouteGuardService } from './services/route-guard.service';
import { SigninComponent } from './signin/signin.component';
import { UrgencesComponent } from './urgences/urgences.component';
import { VHopitalComponent } from './v-hopital/v-hopital.component';

const routes: Routes = [
  {path:'',component:MapsComponent, canActivate:[RouteGuardService]},
  {path:'signin', component:SigninComponent},
  {path:'new', component:InscriptionComponent},
  {path:'profil', component:ProfilComponent, canActivate:[RouteGuardService]},
  {path:'emergency', component:UrgencesComponent, canActivate:[RouteGuardService]},
  {path:'hospitals', component:HopitalsComponent, canActivate:[RouteGuardService]},
  {path:'viewHopital/:id',component:VHopitalComponent},
  {path:'myUrgence/:id',component:MyUrgenceComponent, canActivate:[RouteGuardService]},
  {path:'reset', component:ResetComponent},
  {path:'myDoctor', component:DoctorComponent, canActivate:[RouteGuardService]},



  {path:'**', component:ErrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
