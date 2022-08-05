import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Urgence} from '../model/urgence';
import {UrgenceService} from '../services/urgence.service';
import {BuildMessage} from "../build-message";
import {TypeMessage} from "../type-message";

@Component({
  selector: 'app-my-urgence',
  templateUrl: './my-urgence.component.html',
  styleUrls: ['./my-urgence.component.css']
})
export class MyUrgenceComponent extends BuildMessage implements OnInit {

  constructor(
    private urgServ:UrgenceService,
    private route:ActivatedRoute) {
    super()
  }
  urgence!:Urgence
  id_urg!:number
  ngOnInit(): void {
     let id = this.route.snapshot.params['id']
     this.id_urg = parseInt(id)
     this.loadUrgence(this.id_urg)
  }
  async loadUrgence(id:number) {
    this.urgServ.findById(id).subscribe(
      dat=>{
        this.urgence = dat
        this.buildMessageModal('votre urgence est '+this.urgence.etat.toLowerCase(),TypeMessage.SUCCESS)
      },
      err=>console.log(err)
    )
    return this.urgence
  }
}
