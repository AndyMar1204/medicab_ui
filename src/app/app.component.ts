import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Outils} from './outils';
import {BuildMessage} from "./build-message";
import {TypeMessage} from "./type-message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BuildMessage implements OnInit {

  constructor(private out: Outils, private spinner: NgxSpinnerService) {
    super()
  }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(
      () => {
        this.spinner.hide()
      }, 1500
    )
    let main = document.getElementById('main') as HTMLElement
    if (!this.out.isLogin()) {
      main.removeAttribute('id')
    }
    //this.buildMessageModal("Andy is best", TypeMessage.SUCCESS)
  }

  isLogin = this.out.isLogin()
  title = 'medicab';
}
