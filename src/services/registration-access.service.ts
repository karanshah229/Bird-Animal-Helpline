import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationAccessService {

  access: boolean = false;

  constructor() { }

  get getAccessStatus(){
    this.access = !this.access
    return !(this.access);
  }

  setAccessStatus(access: boolean){
    this.access = access;
  }

}
