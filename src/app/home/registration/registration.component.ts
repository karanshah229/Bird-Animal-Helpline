import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationAccessService } from 'src/services/registration-access.service';
import { flyInOut } from 'src/animations/anim_registration';
import { RegFormService } from 'src/services/reg-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegForm_step2 } from 'src/data/registration/regForm_step2';
import { RegForm_step3 } from 'src/data/registration/regForm_step3';
import { MatStepper } from '@angular/material/stepper';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DpDialogComponent } from './dp-dialog/dp-dialog.component';

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

  //Registration-Page
  progress_bar_background: String[] = ["", "", "", "", ""];
  url: string;
  length: number = 0;
  flyInOut: boolean = true;

  //Step-1
  displayOthers: boolean = false;
  imagePath: String = 'assets/images/home/registration/';
  imageSrc: String = this.imagePath + 'Options.png';
  role:String;
  completed:Boolean = false;
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  //Step-2
  step2: FormGroup;
  step2_data: RegForm_step2;
  hide_secQues: boolean = true;
  maxyear: string;
  minyear: string;
  securityQuestions = ["What is your favourite sport?", "Which floor do you live on?", "What is your place of birth?"];

  //Step-3
  step3: FormGroup;
  step3_data: RegForm_step3;
  hide_pass: boolean = true;
  hide_dp_placeholder_img: boolean = false;
  hide_compressed_img: any = false;
  label_url: string = "assets/images/home/registration/upload_dp.png";
  upload_dp_label_text: string = "Upload a Picture";
  dp_counter: boolean = false;
  compressionError: string;
  uploadedImage: File;
  imagePreview: any;
  step3_completed_status: boolean = false;

  //Preview
  previewData: boolean = false;
  sec_response_hide: boolean = true;
  pass_pin_hide: boolean = true;
  image: any;
  show_loading_gif: boolean = false;

  constructor(private router: Router,
              private regAccess: RegistrationAccessService,
              private regForm: RegFormService,
              private fb: FormBuilder,
              private ng2ImgMax: Ng2ImgMaxService,
              public sanitizer: DomSanitizer,
              public dialog: MatDialog) {
    this.router.events.subscribe((event) => {
      if(this.router.url) {
        this.length = this.router.url.split("/").length - 1;
        this.url = this.router.url.split("/")[this.length];
      }
      if(this.url === "page1") this.progress_bar_background = ["progress-bar-status", "", "", "", ""];
      else if (this.url === "page2") this.progress_bar_background = ["progress-bar-status", "progress-bar-status", "", "", ""];
      else if (this.url === "page3") this.progress_bar_background = ["progress-bar-status", "progress-bar-status", "progress-bar-status", "progress-bar-status", ""];
    });

    this.create_step2_form();
    this.create_step3_form();

  }

  //----------------STEP-1----------------------
  toggle_displayOthers(){
    this.displayOthers = !this.displayOthers;
    if(this.imageSrc === this.imagePath + 'Options.png') this.imageSrc = this.imagePath + 'Options-clicked.png';
    else this.imageSrc = this.imagePath + "Options.png";
  }

  set_role(role: string):void {
    this.role= role;
    this.regForm.setStep1 = this.role;
    this.regAccess.setAccessStatus(true);
    this.stepper.selected.completed = true;
    this.stepper.next();
  }
  //--------------------------------------


  //----------------STEP-2----------------------
  ngOnInit() {
      var d = new Date();
      this.maxyear = (d.getFullYear() - 10).toString() + '-12-31';
      this.minyear = (d.getFullYear() - 100).toString() + '-01-01';
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
      email:         'Email not in valid format',
    },
    securityQuestion: {
      required:      'Answer to Security Question is mandatory'
    },
    securityResponse: {
      required: 'Answer to Security Question is mandatory'
    }
  };

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

  onValueChanged_step2(data?: any) {
    /*if(this.step2.valid) console.log("Form is valid");
    else console.log("Form is invalid");*/
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
                      console.log(key);
                      console.log(messages);
                      this.step2_formErrors[field] += messages[key] + ' ';
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
      //this.stepper.next();
      this.regForm.setStep2 = this.step2_data;
    }
  }

  //----------------STEP-3----------------------
  step3_formErrors = {
    username: '',
    pin: ''
  };

  step3_validationMessages = {
    username: {
      required:      'Username is required',
      minlength:     'Minimum length for username is 4',
      maxlength:     'Maximum length for username is 15'
    },
    pin: {
      required:      'PIN required',
      minLength:     '4 Digit PIN only',
      maxLength:     '4 Digit PIN only',
      pattern:       '4 Digit PIN only'
    }
  };

  create_step3_form(){
    this.step3 = this.fb.group({
      file: [null, [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)] ],
      pin: ['', [Validators.required] ]
    });

    this.step3.valueChanges
        .subscribe(data => this.onValueChanged_step3(data));
  }

  onValueChanged_step3(data?: any){
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


  onDP_Change(event){
    this.image = event.target.files[0];
    if(this.image == undefined) return;
    else {
      this.dp_counter = true;
      this.hide_dp_placeholder_img = true;
      this.hide_compressed_img = true;
      this.show_loading_gif = true;
      this.ng2ImgMax.resizeImage(this.image, 10000, 600).subscribe(
        result => {
          this.uploadedImage = new File([result], result.name);
          this.ng2ImgMax.compressImage(result, 5.00).subscribe(
            result => {
              this.upload_dp_label_text = "Click here to Change Picture";
              this.uploadedImage = new File([result], result.name);
              this.getImagePreview(this.uploadedImage);
              this.hide_dp_placeholder_img = true;
              this.hide_compressed_img = false;
              this.show_loading_gif = false;
              this.compressionError = undefined;
              this.step3_completed_status = true;
            },
            error => {
              this.hide_dp_placeholder_img = false;
              this.hide_compressed_img = true;
              this.step3_completed_status = false;
              this.compressionError = error.reason;
              console.log('Error Compessing Image: ', error);
            }
          );
        },
        error => {
          this.hide_dp_placeholder_img = false;
          this.hide_compressed_img = true;
          this.step3_completed_status = false;
          this.compressionError = error.reason;
          console.log("Error Resizing Image: ", error);
        }
      );
    }
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.step3.patchValue({
        file: this.imagePreview
      });
    };
  }

  open_dp_dialog() {
    this.dialog.open(DpDialogComponent, {
      minHeight: '50vh',
      maxHeight: '80vh',
      maxWidth: '90vw',
      data: {
        image: this.imagePreview
      }
    });
  }

  submitStep3(){
    this.step3_data = this.step3.value;
    if(this.step3.valid && this.step3_completed_status && this.image != undefined) {
      this.previewData = true;
      this.regForm.setStep3 = this.step3_data;
    } else {
      this.dp_counter = true;
      this.compressionError = "Please Upload a Display Picture";
    }
  }

}
