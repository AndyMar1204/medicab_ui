import { Component, OnInit } from '@angular/core';
import { TaxiServiceService } from '../data/taxi-service.service';
import { Taxi } from '../models/taxi';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {
  allTaxis : Taxi[]
  constructor(private serv:TaxiServiceService) { }

  ngOnInit() {
    this.getAllTaxis()
  }
getAllTaxis(){
  this.serv.findAll().subscribe(
    response=>{
      console.log(response)
this.allTaxis = response;
return this.allTaxis;
    }
  )
}
}
