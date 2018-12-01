import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/index';
import {Country} from '../model/country';
import {State} from '../model/state';
import {City} from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createUser(userDetail) {
    return this.http.post(`${this.apiUrl}/userInfo/createUser`, userDetail);
  }

  fetchAllCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/country/findAll`);
  }

  fetchAllStateByCountry(countryId): Observable <State[]> {
    return this.http.get<State[]>(`${this.apiUrl}/state/findByCountry/${countryId}`);
  }

  fetchAllCityByState(stateId): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/city/findByState/${stateId}`);
  }

}
