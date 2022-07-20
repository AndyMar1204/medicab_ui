import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { ErrComponent } from './err/err.component';
import { MapsComponent } from './maps/maps.component';
import { SigninComponent } from './signin/signin.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProfilComponent } from './profil/profil.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UrgencesComponent } from './urgences/urgences.component';
import { HopitalsComponent } from './hopitals/hopitals.component';

import { VHopitalComponent } from './v-hopital/v-hopital.component';
import { MyUrgenceComponent } from './my-urgence/my-urgence.component';
import { ResetComponent } from './reset/reset.component';
import { DoctorComponent } from './doctor/doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    ErrComponent,
    MapsComponent,
    SigninComponent,
    InscriptionComponent,
    ProfilComponent,
    UrgencesComponent,
    HopitalsComponent,
    VHopitalComponent,
    MyUrgenceComponent,
    ResetComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
     NgxSpinnerModule 
  ],
  providers: [],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
