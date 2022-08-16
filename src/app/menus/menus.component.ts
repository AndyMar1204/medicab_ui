import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../model/account';
import {FileInfo} from '../model/file-info';
import {User} from '../model/user';
import {ID_ACCOUNT, NUMBER, Outils, PASSWORD, TYPE_ACCOUNT, URL_, USER} from '../outils';
import {AccountService} from '../services/account.service';
import {UserService} from '../services/user.service';
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  account!: Account
  id_acc = parseInt(sessionStorage.getItem(ID_ACCOUNT)!)
  typeAccount = sessionStorage.getItem(TYPE_ACCOUNT)
  user !: User

  constructor(
    private out: Outils,
    private accServ: AccountService,
    private route: Router,
    private uServ: UserService,
    private cookieService: CookieService
  ) {
  }

  isConnected = this.out.isLogin();

  ngOnInit(): void {
    this.loadAccount().then(
      ()=>{
        if (sessionStorage.getItem(TYPE_ACCOUNT) == USER) {
          this.initUser()
        }
      }
    )

  }

  toggleMenu() {
    let icon = document.getElementById('toggle-sidebar') as HTMLElement
    let body = document.body;
    if (body.classList.contains('toggle-sidebar')) {
      body.classList.remove('toggle-sidebar')
    } else
      body.classList.add('toggle-sidebar')
  }

  logOut() {
    Outils.logout(this.cookieService);
  }

  async loadAccount()  {
    this.accServ.findById(this.id_acc).subscribe(
      dat => {
        this.account = dat
      },
      err => console.log(err)
    )
  }

  getProfil(pr: FileInfo) {
    return URL_ + "rest/files/" + `${pr.name}`
  }

  goToMyHopital() {
    this.route.navigate([`/viewHopital/${this.user.hopital.id}`])
  }

  initUser() {
    this.uServ.findById(parseInt(sessionStorage.getItem(ID_ACCOUNT)!)).subscribe(
      dat => this.user = dat,
      err => console.log(err)
    )
  }
}

