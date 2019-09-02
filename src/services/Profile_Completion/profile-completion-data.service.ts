import { Injectable } from '@angular/core';
import { home_addr } from 'src/data/profile_completion/profile_cmpl';
import { work_addr } from 'src/data/profile_completion/profile_cmpl2';
import { pick_up_locations } from 'src/data/profile_completion/profile_cmpl3';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletionDataService {

  home_address: home_addr;
  work_address: work_addr;
  pick_up_locations: pick_up_locations;

  constructor() { }

  set home_addr(home_addr){
    this.home_address = home_addr;
  }

  set work_addr(work_addr){
    this.work_address = work_addr;
  }

  set pick_up_loc(pic_up_loc){
    this.pick_up_locations = pic_up_loc;
  }

  get home_addr(){
    return this.home_address;
  }

  get work_addr(){
    return this.work_address;
  }

  get pick_up_loc(){
    return this.pick_up_locations;
  }

}
