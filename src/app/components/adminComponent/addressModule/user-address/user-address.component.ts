import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../../service/common.service';
declare var $: any;

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

}
