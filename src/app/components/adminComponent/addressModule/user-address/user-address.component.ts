import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../../service/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;
import Swal from 'sweetalert2';
import {Country} from '../../../../model/country';
import {State} from '../../../../model/state';
import {City} from '../../../../model/city';
import {UserAddressService} from '../../../../service/user-address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  public countryList: Country[];
  public stateList: State[];
  public cityList: City[];
  public name: string;
  public permanentAddress: string;
  public currentAddress: string;
  public mobileNumber: number;
  public countryId: number;
  public stateId: number;
  public cityId: number;
  public isSubmitted = false;
  public userInfoForm: FormGroup;

  constructor(public commonService: CommonService, public fb: FormBuilder,
              public userAddressService: UserAddressService) { }

  ngOnInit() {
    this.userInfoForm = this.fb.group({
      name: [this.name, Validators.required],
      mobileNumber: [this.mobileNumber, Validators.required],
      permanentAddress: [this.permanentAddress, Validators.required],
      currentAddress: [this.currentAddress],
      stateId: [this.stateId, Validators.required],
      countryId: [this.countryId, Validators.required],
      cityId: [this.cityId, Validators.required]
    });

    this.fetchAllCountries();
  }

  showToaster(message, type) {
    Swal({
      title: message,
      type: type,
      timer: 2000
    });

    // if (type === 'success') {
    //   this.redirectToHome();
    // }
  }

  fetchAllCountries() {
    this.userAddressService.fetchAllCountry().subscribe(
      (data) => {
        this.countryList = data;
      },
      (err) => {
        alert(err['error'].message ? err['error'].message : err['error'].text);
      }
    );
  }

  fetchStateByCountry(countryId) {

    this.userAddressService.fetchAllStateByCountry(countryId).subscribe(
      (data) => {
        this.stateList = [];
        this.stateList = data;
      },
      (err) => {
        alert(err['error'].message ? err['error'].message : err['error'].text);
      }
    );
  }

  fetchCityByState(stateId) {
    this.userAddressService.fetchAllCityByState(stateId).subscribe(
      (data) => {
        this.cityList = data;
      },
      (err) => {
        alert(err['error'].message ? err['error'].message : err['error'].text);
      }
    );
  }
  createUser() {
    this.isSubmitted = true;

    if(this.userInfoForm.valid) {
      this.userAddressService.createUser(this.userInfoForm.value).subscribe(
        (data) => this.showToaster(data['message'], data['type']),
        (err)  => this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error')
      );
    }

  }

}
