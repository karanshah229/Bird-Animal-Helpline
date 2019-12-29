import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { flyInOut } from 'src/animations/anim_registration';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
  animations: [ flyInOut() ]
})
export class ForgotPINComponent implements OnInit {

  validate_details: FormGroup;
  new_PIN: FormGroup;

  maxyear: string;
  minyear: string;
  securityQuestions = ["What is your favourite sport?", "Which floor do you live on?", "What is your place of birth?"];
  selectedQues = this.securityQuestions[0];

  hide_secQues: boolean = true;
  hide_newPIN: boolean = true;

  submit_status: boolean = false;
  submit_failure: boolean = false;
  Form_Submission_Error_Msg: string;
  step1_status: boolean = false;
  PIN_change_status: boolean = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient) {
    this.create_details();
    this.create_newPIN_Form();
  }

  ngOnInit() {
  }

  validate_details_formErrors = {
    dob: '',
    mobileNumber: '',
    securityQuestion: '',
    securityResponse: ''
  };

  validate_details_validationMessages = {
    dob: {
      required:      'Date of Birth is required',
      pattern:       'Invalid Date of Birth'
    },
    mobileNumber: {
      required:      'Mobile number is required',
      pattern:       'Ten digit mobile number without prefix'
    },
    securityQuestion: {
      required:      'Answer to Security Question is mandatory'
    },
    securityResponse: {
      required: 'Answer to Security Question is mandatory'
    }
  };

  create_details(){
    this.validate_details = this.fb.group({
      dob: ['', [Validators.required]],
      countryCode: [{value: '+91', readonly: true}],
      mobileNumber: ['', [Validators.required, Validators.pattern]],
      securityQuestion: ['', [Validators.required]],
      securityResponse: ['', [Validators.required]]
    });

    this.validate_details.valueChanges
      .subscribe(data => this.onValueChanged_details(data));
  }

  onValueChanged_details(data?: any) {
    if (!this.validate_details) { return; }
    const form = this.validate_details;
    for (const field in this.validate_details_formErrors) {
        if (this.validate_details_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.validate_details_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validate_details_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                      this.validate_details_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  submit_details(){
    if(this.validate_details.valid){
      const fd = new FormData();
      fd.append("Details", JSON.stringify(this.validate_details.value));
      //TODO: ForgotPIN URL, and working
      this.http.post('http://birdhelpline.com/registration', fd, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe( (event) => {
          if(event.type === 0){
            this.submit_status = false;
            this.submit_failure = true;
            this.Form_Submission_Error_Msg = "Error sending data. Please try again!";
          }
          if(event.type === HttpEventType.Response){
            this.step1_status = true;
            console.log(event);
            console.log("Registration Successfull");
          }
        });
    }
  }

  newPIN_formErrors = {
    pin: ''
  };

  newPIN_validationMessages = {
    pin: {
      required:      'PIN required',
      minLength:     '4 Digit PIN only',
      maxLength:     '4 Digit PIN only',
      pattern:       '4 Digit PIN only'
    }
  };

  create_newPIN_Form(){
    this.new_PIN = this.fb.group({
      pin: ['', [Validators.required, Validators.pattern]]
    });

    this.new_PIN.valueChanges
      .subscribe(data => this.onValueChanged_newPIN(data));

  }

  onValueChanged_newPIN(data?: any) {
    if (!this.new_PIN) { return; }
    const form = this.new_PIN;
    for (const field in this.newPIN_formErrors) {
        if (this.newPIN_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.newPIN_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.newPIN_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                      this.newPIN_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  submit_newPIN(){
    if(this.new_PIN.valid){
      const fd = new FormData();
      fd.append("New PIN", JSON.stringify(this.new_PIN.value));
      //TODO: NewPIN URL, and working
      this.http.post('http://birdhelpline.com/registration', fd, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe( (event) => {
          if(event.type === 0){
            this.submit_status = false;
            this.submit_failure = true;
            this.Form_Submission_Error_Msg = "Error sending data. Please try again!";
          }
          if(event.type === HttpEventType.Response){
            this.PIN_change_status = true;
            console.log(event);
            console.log("Registration Successfull");
          }
        });
    }
  }

  retry(){
    if(this.step1_status == false) this.submit_details();
    else this.submit_newPIN();
  }

}
