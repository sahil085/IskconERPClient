import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

declare function updateLocation(url, token): any;

@Component({
  selector: 'app-rath-yatra-location',
  templateUrl: './rath-yatra-location.component.html',
  styleUrls: ['./rath-yatra-location.component.css']
})

export class RathYatraLocationComponent implements OnInit {


  secretkey: any;
  apiUrl: string = environment.apiUrl;


  constructor() { }

  ngOnInit() {
  }

  updateLocation() {
    if (this.secretkey === 'gaurHari@123') {
      const token = localStorage.getItem('Authorization');
      updateLocation(this.apiUrl, token);
    }
  }

}
