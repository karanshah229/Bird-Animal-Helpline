import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationAccessService } from 'src/services/registration-access.service';
import { flyInOut } from 'src/animations/anim_registration';
import { RegFormService } from 'src/services/reg-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegForm_step2 } from 'src/data/registration/regForm_step2';
import { RegForm_step3 } from 'src/data/registration/regForm_step3';
import { MatStepper } from '@angular/material/stepper';
//import { Ng2ImgToolsService } from 'ng2-img-tools';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
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
  completed:Boolean = false;
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  step2: FormGroup;
  step2_data: RegForm_step2;
  hide: boolean = true;
  maxyear: string;
  minyear: string;
  securityQuestions = ["What is your favourite sport?", "Which floor do you live on?", "What is your place of birth?"];

  step3: FormGroup;
  step3_data: RegForm_step3;
  uploadedImage: File;
  previewData: boolean = false;

  constructor(private router: Router,
              private regAccess: RegistrationAccessService,
              private regForm: RegFormService,
              private fb: FormBuilder,
              //private ng2ImgToolsService: Ng2ImgToolsService,
              public sanitizer: DomSanitizer) {
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

    this.create_step2_form();
    this.create_step3_form();

  }

  toggle_displayOthers(){
    this.displayOthers = !this.displayOthers;
    if(this.imageSrc === this.imagePath + 'Options.png') this.imageSrc = this.imagePath + 'Options-clicked.png';
    else this.imageSrc = this.imagePath + "Options.png";
  }

  set_role(role: string):void {
    this.role= role;
    this.regForm.setStep1 = this.role;
    this.regAccess.setAccessStatus(true);
    // complete the current step
    this.stepper.selected.completed = true;
    // move to next step
    this.stepper.next();
  }

  setURL(url){
    this.url = url;
  }


  selectedQues = this.securityQuestions[0];

  step2_formErrors = {
    firstName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    gender: '',
    email: '',
    securityResponse: ''
  };

  step3_formErrors = {
    username: '',
    pin: ''
  };

  step2_validationMessages = {
    firstName: {
      required:      'First Name is required',
      minlength:     'Min length - 2',
      maxlength:     'Max Length - 25'
    },
    lastName: {
      required:      'Last Name is required',
      minlength:     'Min length - 2',
      maxlength:     'Max Length - 25'
    },
    dob: {
      required:      'Date of Birth is required',
      pattern:       'Invalid Date of Birth'
    },
    mobileNumber: {
      required:      'Mobile number is required',
      pattern:       'Ten digit mobile number without prefix'
    },
    gender: {
      required:      'Please specify any one gender'
    },
    email: {
      required:      'Email is required',
      email:         'Email not in valid format'
    },
    securityQuestion: {
      required:      'Answer to Security Question is mandatory'
    },
    securityResponse: {
      required: 'Answer to Security Question is mandatory'
    }
  };

  step3_validationMessages = {
    username: {
      required:      'Username is required',
      minlength:     'Minimum length for username is 4',
      maxlength:     'Maximum length for username is 15'
    },
    pin: {
      required:      'PIN is required',
      minLength:     'PIN must be 4 digits only',
      maxLength:     'PIN must be 4 digits only'
    }
  };

  ngOnInit() {
      var d = new Date();
      this.maxyear = (d.getFullYear() - 10).toString() + '-12-31';
      this.minyear = (d.getFullYear() - 100).toString() + '-01-01';
  }

  create_step2_form(){
    this.step2 = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      dob: [null, [Validators.required]],
      countryCode: [{value: '+91', disabled:true}],
      mobileNumber: [null, [Validators.required, Validators.pattern]],
      gender: [null, [Validators.required]],
      emailID: ['', [Validators.required, Validators.email]],
      securityQuestion: [null, Validators.required],
      securityResponse: ['',[Validators.required] ]
    });

    this.step2.valueChanges
        .subscribe(data => this.onValueChanged_step2(data));
  }

  create_step3_form(){
    this.step3 = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)] ],
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ]
    });

    this.step3.valueChanges
        .subscribe(data => this.onValueChanged_step3(data));
  }

  onValueChanged_step2(data?: any) {
    if(this.step2.valid) console.log("Form is valid");
    else console.log("Form is invalid");
    if (!this.step2) { return; }
    const form = this.step2;
    for (const field in this.step2_formErrors) {
        if (this.step2_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.step2_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.step2_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.step2_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  onValueChanged_step3(data?: any){
    if(this.step3.valid) console.log("Form is valid");
    else console.log("Form is invalid");
    if (!this.step3) { return; }
    const form = this.step3;
    for (const field in this.step3_formErrors) {
        if (this.step3_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.step3_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.step3_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.step3_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  submitStep2(){
    //console.log(this.step2.value);
    this.step2_data = this.step2.value;
    if(this.step2.valid) {
      this.stepper.next();
      this.regForm.setStep2 = this.step2_data;
      this.regForm.display();
    }
  }

  /*onDP_Change(event){
    let image = event.target.files[0];

    this.ng2ImgToolsService.resizeImage(image, 10000, 600).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);;
      },
      error => {
        console.log("Error Resizing Image: ", error);
      }
    );

    this.ng2ImgToolsService.compressImage(image, 5.00).subscribe(
    result => {
      this.uploadedImage = new File([result], result.name);
      this.getImagePreview(this.uploadedImage);
    },
    error => {
      console.log('Error Compessing Image: ', error);
    }
  );
  }

  imagePreview: any;

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }*/

  submitStep3(){
    //console.log(this.step2.value);
    this.step3_data = this.step3.value;
    if(this.step3.valid) {
      this.stepper.next();
      this.previewData = true;
      this.regForm.setStep3 = this.step3_data;
    }
  }

}
