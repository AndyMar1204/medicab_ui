import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from '../model/doctor';
import { User } from '../model/user';
import { ID_ACCOUNT } from '../outils';
import { DoctorService } from '../services/doctor.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  user: User = new User()
  docteur: Doctor = new Doctor()
  doctors: Doctor[] = []
  constructor(
    private usService: UserService,
    private docService: DoctorService
  ) { }

  ngOnInit(): void {
    this.loadUser()
    this.initAllDoctors()
  }
  async loadUser() {
    this.usService.findById(parseInt(sessionStorage.getItem(ID_ACCOUNT)!)).subscribe(
      data => {
        this.user = data
        if (data.doctor) {
          this.docteur = data.doctor
        } else {
          this.docteur = new Doctor()
        }
      },
      err => {
        console.log(err)
      }
    )

  }
  addOrUpdateDocteur(docForm: NgForm) {
    if (docForm.invalid) {
      alert("Formulaire invalides, corrigez les erreurs")
      return;
    }
    else
    {
      console.log(this.docteur)
      this.usService.addUserDoctor(this.user, this.docteur).subscribe(
        
      data => {
          console.log('success : ' + data.id)
           this.closeModal()
           location.reload()
        },
        err => console.log(err)
      )
    }
   
  }
  setDoctor(doc: Doctor) {
    //console.log(this.user)
    this.docteur = doc
  }
  initAllDoctors() {
    this.docService.findAll().subscribe(
      data => this.doctors = data,
      err => console.log(err)
    )
  }
  closeModal() {
    let annuler = document.getElementById('annuler') as HTMLButtonElement
    annuler.click()
  }
}
