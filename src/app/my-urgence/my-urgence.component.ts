import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urgence } from '../model/urgence';
import { UrgenceService } from '../services/urgence.service';

@Component({
  selector: 'app-my-urgence',
  templateUrl: './my-urgence.component.html',
  styleUrls: ['./my-urgence.component.css']
})
export class MyUrgenceComponent implements OnInit {

  constructor(
    private urgServ:UrgenceService,
    private route:ActivatedRoute) { }
  urgence!:Urgence
  id_urg!:number
  ngOnInit(): void {
     let id = this.route.snapshot.params['id']
     this.id_urg = parseInt(id)
     this.loadUrgence(this.id_urg).then(
      (urg)=>{
        this.urgence = urg
      }, 
      err=>console.log(err)
     )
  }
  async loadUrgence(id:number) {
    this.urgServ.findById(id).subscribe(
      dat=>this.urgence = dat,
      err=>console.log(err)
    )
    return this.urgence
  }
}
