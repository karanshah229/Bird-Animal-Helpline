import { Injectable } from '@angular/core';
import { RegForm_step2 } from 'src/data/registration/regForm_step2';
import { RegForm_step3 } from 'src/data/registration/regForm_step3';

@Injectable({
  providedIn: 'root'
})
export class RegFormService {

  role: String;
  step2: RegForm_step2;
  step3: RegForm_step3;

  constructor() { }

  set setStep1(step1: String){
    this.role = step1;
  }

  set setStep2(step2: RegForm_step2){
    this.step2 = step2;
  }

  set setStep3(step3: RegForm_step3){
    this.step3 = step3;
  }

  get getStep1(){
    return this.role;
  }

  get getStep2(){
    return this.step2;
  }

  get getStep3(){
    return this.step3;
  }

  display(){
    console.log(this.role);
    console.log(this.step2);
    console.log(this.step3);
  }

}
