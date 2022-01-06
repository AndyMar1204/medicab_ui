import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminsComponent } from './admins/admins.component';
import { StatComponent } from './stat/stat.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { AddUserComponent } from './add-user/add-user.component';
import { TaxisComponent } from './taxis/taxis.component';
import { SignupComponent } from './signup/signup.component';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ResetComponent } from './reset/reset.component';
import { MenuComponent } from './menus/menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilComponent } from './profil/profil.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    AdminsComponent,
    StatComponent,
    ConnexionComponent,
    ErrorComponent,
    AddUserComponent,
    TaxisComponent,
    SignupComponent,
    MessageModalComponent,
    SigninComponent,
    HomeComponent,
    ResetComponent,
    MenuComponent,
    LogoutComponent,
    ProfilComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
