import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationAccessService } from 'src/services/registration-access.service';
import { flyInOut } from 'src/animations/anim_registration';
import { RegFormService } from 'src/services/reg-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegForm_step2 } from 'src/data/registration/regForm_step2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [ flyInOut() ]
})
export class RegistrationComponent implements OnInit {

  progress_bar_background: String[] = ["", "", "", "", ""];
  url: string;
  length: number = 0;
  flyInOut: boolean = true;

  displayOthers: boolean = false;
  imagePath: String = 'assets/images/home/registration/';
  imageSrc: String = this.imagePath + 'Options.png';
  role:String = '';

  step2: FormGroup;
  step2_data: RegForm_step2;
  hide: boolean = true;
  maxyear: string;
  minyear: string;

  constructor(private router: Router, private regAccess: RegistrationAccessService, private regForm: RegFormService, private fb: FormBuilder) {
    this.router.events.subscribe((event) => {
      if(this.router.url) {
        this.length = this.router.url.split("/").length - 1;
        this.url = this.router.url.split("/")[this.length];
      }
      if(this.url === "page1") this.progress_bar_background = ["progress-bar-status", "", "", "", ""];
      else if (this.url === "page2") this.progress_bar_background = ["progress-bar-status", "progress-bar-status", "", "", ""];
      else if (this.url === "page3") this.progress_bar_background = ["progress-bar-status", "progress-bar-status", "progress-bar-status", "progress-bar-status", ""];
    });

    this.role = "";

    this.createForm();
    if(this.regForm.getStep2){
      this.step2.setValue({
        firstName: this.regForm.getStep2.firstName,
        lastName: this.regForm.getStep2.lastName,
        dob: this.regForm.getStep2.dob,
        countryCode: '+91',
        mobileNumber: this.regForm.getStep2.mobileNumber,
        gender: this.regForm.getStep2.gender,
        emailID: this.regForm.getStep2.emailID,
        securityQuestion: this.regForm.getStep2.securityQuestion,
        securityResponse: ''
      });
    }

  }

  toggle_displayOthers(){
    this.displayOthers = !this.displayOthers;
    if(this.imageSrc === this.imagePath + 'Options.png') this.imageSrc = this.imagePath + 'Options-clicked.png';
    else this.imageSrc = this.imagePath + "Options.png";
  }

  set_role(role):void {
    this.role= role;
    this.regForm.setStep1 = this.role;
    this.regAccess.setAccessStatus(true);
  }

  ngOnDestroy(){
    this.displayOthers = false;
    this.role = "";
  }

  setURL(url){
    this.url = url;
  }

}
