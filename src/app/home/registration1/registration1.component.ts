import { Component, OnInit } from '@angular/core';
import { RegistrationAccessService } from 'src/services/registration-access.service';
import { flyInOut } from 'src/animations/anim_registration';
import { RegFormService } from 'src/services/reg-form.service';
@Component({
  selector: 'app-registration1',
  templateUrl: './registration1.component.html',
  styleUrls: ['./registration1.component.scss'],
  animations: [ flyInOut() ]
})
export class Registration1Component implements OnInit {

  displayOthers: boolean = false;
  imagePath: String = 'assets/images/home/registration/';
  imageSrc: String = this.imagePath + 'Options.png';
  role:String = '';
  flyInOut: boolean = true;

  constructor(private regAccess: RegistrationAccessService, private regForm: RegFormService) {
    this.role = "";
  }

  ngOnInit() {
    this.role = "";
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

}
