import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Loader} from '@googlemaps/js-api-loader';
import {NgxSpinnerService} from 'ngx-spinner';
import {Driver} from '../model/driver';
import {Hopital} from '../model/hopital';
import {Position} from '../model/position';
import {Urgence} from '../model/urgence';
import {User} from '../model/user';
import {ID_ACCOUNT, ID_POSITION, Outils, TYPE_ACCOUNT, URL_, USER} from '../outils';
import {DriverService} from '../services/driver.service';
import {HopitalService} from '../services/hopital.service';
import {PositionService} from '../services/position.service';
import {UrgenceService} from '../services/urgence.service';
import {UserService} from '../services/user.service';
import {BuildMessage} from "../build-message";
import {TypeMessage} from "../type-message";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent extends BuildMessage implements OnInit {
  user!: User
  typeTrans!: string
  constructor(private httpClient: HttpClient,
    private driverService: DriverService,
    private hopitalService: HopitalService,
    private posService: PositionService,
    private spinner: NgxSpinnerService,
    private userServ: UserService,
    private urgenceService: UrgenceService,
    private router: Router) {
    super()
  }


  loader = new Loader({
    apiKey: "AIzaSyCQ9_nzfMlRjohAaWOYz19nY1Ux40wdzcE",
    version: "weekly",
  });
  allTrans: string[] = []
  hopitals: Hopital[] = []
  driver: Driver[] = []
  ngOnInit(): void {

    this.loadTrans()
    navigator.geolocation.getCurrentPosition(
      (currePos) => {
        //this.removePadding()
        const mapOptions = {
          center: { lat: currePos.coords.latitude, lng: currePos.coords.longitude },
          zoom: 15,
          mapTypeId: "roadmap",
          heading: 90,
          tilt: 45,
          // disableDefaultUI: true,
          zoomControl: true,
          scaleControl: true,
          rotateControl: true,
          streetViewControl: true,
          mapTypeControl: true,
        };
        this.loader.load().then(() => {

          let map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
          this.silentPositionUpdater(currePos)
          const svgMarker = {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(15, 30),
          };
          var myMarker = new google.maps.Marker(
            {
              position: { lat: currePos.coords.latitude, lng: currePos.coords.longitude },
              label: "Moi",
              title: 'Je suis ici',
              icon: svgMarker,
            }
          )
          myMarker.setMap(map)
          this.loadDrivers(map)
          this.loadHopital(map)
        })
      },
      erreur => {
        // check if the user denied geolocation, or if there was any other problem
        if (erreur.code == erreur.PERMISSION_DENIED) {
          this.buildMessageModal('La géolocalisation a été desactivée,\n Revérifiez les parametres de votre application',TypeMessage.WARNING)

        }
        else {
          this.buildMessageModal('Impossible de trouver votre position,\n Veuillez reéssayer plus tard.',TypeMessage.SUCCESS)

        }
      }
    )
    this.initUser()
  }
  removePadding() {
    let main = document.getElementById("main") as HTMLElement
    main.removeAttribute("id")
  }
  addPadding() {
    let main = document.getElementById("main") as HTMLElement
    main.removeAttribute("id")
  }
  loadTrans() {
    this.httpClient.get<string[]>(URL_ + 'getAllTypesTrans').subscribe(
      dat => this.allTrans = dat,
      err => {
        console.log(err);
      }
    )
  }
  addHopitalToMap(hopital: Hopital, map: google.maps.Map) {
    const infoWindow = new google.maps.InfoWindow();
    const hopLatLong = { lat: hopital.position.latitude, lng: hopital.position.longitude }
    let marker = new google.maps.Marker({
      position: hopLatLong,
      label: hopital.username.toUpperCase().charAt(0),
      title: hopital.username,
      optimized: true,
      animation: google.maps.Animation.DROP,
    })
    marker.addListener("click", () => {
      infoWindow.close()
      infoWindow.setContent(hopital.username + '<br>' + Outils.buildAdresse(hopital.adresse))
      //infoWindow.setContent(hopital.heureFermeture.toUTCString())
      infoWindow.open(marker.getMap()!, marker)
    })
    // marker.setIcon('assets/icons/hop_logo.png')
    marker.setMap(map)
  }
  addDriverToMap(driver: Driver, map: google.maps.Map) {
    const infoWindow = new google.maps.InfoWindow();
    const hopLatLong = { lat: driver.position.latitude, lng: driver.position.longitude }
    let marker = new google.maps.Marker({
      position: hopLatLong,
      label: driver.username.toUpperCase().charAt(0),
      title: driver.username,
      optimized: true,
      animation: google.maps.Animation.DROP,
    })
    marker.addListener("click", () => {
      infoWindow.close()
      infoWindow.setContent(driver.username + '<br>' + Outils.buildAdresse(driver.adresse))
      //infoWindow.setContent(hopital.heureFermeture.toUTCString())
      infoWindow.open(marker.getMap()!, marker)
    })
    marker.setIcon('assets/icons/car.png')
    marker.setMap(map)
  }
  loadDrivers(map: google.maps.Map) {
    this.driverService.findAll().subscribe(
      data => {
        data.forEach(d => {
          this.addDriverToMap(d, map);
        });
      },
      err => {
        this.buildMessageModal("chargement des taxis echoué", TypeMessage.WARNING)
      }
    )
  }
  loadHopital(map: google.maps.Map) {
    this.hopitalService.findAll().subscribe(
      dat => {
        dat.forEach(e => {
          this.addHopitalToMap(e, map)
        });
      },
      err => console.log(err)
    )
  }

  silentPositionUpdater(location: GeolocationPosition) {
    let position = new Position()
    let id_pos = parseInt(sessionStorage.getItem(ID_POSITION)!)
    position.id = id_pos
    position.latitude = location.coords.latitude
    position.longitude = location.coords.longitude
    this.posService.update(position, id_pos).subscribe(
      success => console.log(success)
      ,
      err => console.log(err)
    )
  }
  async initUser() {
    let id_user = parseInt(sessionStorage.getItem(ID_ACCOUNT)!)
    this.userServ.findById(id_user).subscribe(
      dat => {
        this.user = dat
      },
      err => console.log(err)
    )
  }
  async initEmergency(emergency: string) {
    if (sessionStorage.getItem(TYPE_ACCOUNT) === USER) {


      if (this.typeTrans) {
        let urg: Urgence = new Urgence()
        let hop = new Hopital()
        hop.id = 0;
        urg.user = this.user
        urg.typeTransport = this.typeTrans
        urg.typeUrgences = emergency
        urg.hopital = hop
        this.urgenceService.save(urg).subscribe(
          data => {
            this.buildMessageModal('urgence est en cours...',TypeMessage.INFOS)

            this.router.navigate(['myUrgence/' + `${data}`])

          }, err => {
            this.buildMessageModal('Impossible de lancer une urgence '.concat(err.error.erreur),TypeMessage.WARNING)
            console.log(err)
          }
        )
      } else
        this.buildMessageModal("Veuillez choisir un moyen de transport",TypeMessage.WARNING)
    } else {
      this.buildMessageModal("Les urgences ne sont pas supportés pour les comptes " + sessionStorage.getItem(TYPE_ACCOUNT), TypeMessage.WARNING)
      return
    }


  }
}
