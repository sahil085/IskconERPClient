import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../environments/environment';

declare function getLocation(url): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log(this.apiUrl);

    getLocation(this.apiUrl);

  }

}
