import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public static showSpinner = false;

  constructor() { }
}
