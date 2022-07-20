import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from './model/account';
import { Outils } from './outils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private out:Outils,private spinner: NgxSpinnerService){

  }

  ngOnInit(): void {
      this.spinner.show()
      setTimeout(
        ()=>{
          this.spinner.hide()
        },1500
      ) 
      let main = document.getElementById('main') as HTMLElement
        if (!this.out.isLogin()) {
        main.removeAttribute('id')
      }
    
  }
  isLogin = this.out.isLogin()
  title = 'medicab';
}
