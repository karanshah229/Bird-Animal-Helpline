import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PincodesService {

  pincodes: any;

  constructor(private http: HttpClient) {
    this.Pincodes().subscribe(data => {
      this.pincodes = data;
    });
  }

  public Pincodes() {
    return this.http.get("assets/pincodes.json");
  }

  getPincodes(value? : string, defaultVal: string = ''){
    let filterValue = '';
    if(value == undefined) filterValue = defaultVal.toLowerCase();
    else filterValue = value.toLowerCase();

    let result = this.pincodes.filter(d => d["Area"].toLowerCase().includes(filterValue));
    if (result == undefined || result.length == 0 || result == ''){
      result = this.pincodes.filter(d => d["Pincode"].toString().includes(filterValue));
    }

    return result;
  }

  updatePincodesList(selectedPincode: any){
    let filterValue = selectedPincode.Area.toLowerCase();
    this.pincodes = this.pincodes.filter(d => d["Area"].toLowerCase() != filterValue);
  }

  addPincodeBack(pincode: any){
    this.pincodes.unshift(pincode);
  }

}
