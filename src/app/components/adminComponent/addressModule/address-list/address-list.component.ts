import { Component, OnInit } from '@angular/core';
import {Country} from "../../../../model/country";
import {UserAddressService} from "../../../../service/user-address.service";
import {AddressList} from "../../../../model/address-list";
import {CommonService} from "../../../../service/common.service";
declare var $: any;

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  public addressList: AddressList[];

  constructor(public userAddressService: UserAddressService, public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.showSpinner = true;
  this.fetchAddressList();
  }

  fetchAddressList () {
    this.userAddressService.fetchAddressList().subscribe(
      (data) => {
        this.addressList = data;
        this.commonService.showSpinner = false;
      },
      (err) => {
        alert(err['error'].message ? err['error'].message : err['error'].text);
      }
    );
  }

}
