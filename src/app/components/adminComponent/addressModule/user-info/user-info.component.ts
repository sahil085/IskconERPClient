import { Component, OnInit } from '@angular/core';
import {AddressService} from "../../../../service/address.service";
import {UserAddressService} from "../../../../service/user-address.service";
import {CommonService} from "../../../../service/common.service";
import {UserInfo} from "../../../../model/user-info";
import {Country} from "../../../../model/country";
import {State} from "../../../../model/state";
import {City} from "../../../../model/city";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private userInfoList: UserInfo[];
  private CountryList: Country[];
  private stateList: State[];
  private cityList: City[];

  constructor(private userAddressService: UserAddressService,private commonService: CommonService) { }

  ngOnInit() {



  }



}
