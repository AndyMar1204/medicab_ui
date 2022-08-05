import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent implements OnInit {


  @Input('messageModal') messageModal !: string;
  @Input('type') type !:string;
  constructor() { }

  ngOnInit() {
  }
}
