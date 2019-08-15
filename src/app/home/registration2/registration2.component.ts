import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut } from 'src/animations/anim_registration';
import { RegForm_step2 } from 'src/data/registration/regForm_step2';
import { Router } from '@angular/router';
import { RegFormService } from 'src/services/reg-form.service';

@Component({
  selector: 'app-registration2',
  templateUrl: './registration2.component.html',
  styleUrls: ['./registration2.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
  animations: [ flyInOut() ]

})
export class Registration2Component implements OnInit {

  step2: FormGroup;
  step2_data: RegForm_step2;
  hide: boolean = true;
  maxyear: string;
  minyear: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private regForm: RegFormService) {
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

  securityQuestions = ["What is your favourite sport?", "Which floor do you live on?", "What is your place of birth?"];
  selectedQues = this.securityQuestions[0];

  formErrors = {
    firstName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    gender: '',
    email: '',
    securityResponse: ''
  };

  validationMessages = {
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

  ngOnInit() {
      var d = new Date();
      this.maxyear = (d.getFullYear() - 10).toString() + '-12-31';
      this.minyear = (d.getFullYear() - 100).toString() + '-01-01';
      console.log(this.maxyear + "  " + this.minyear);
  }

  createForm(){
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
        .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(this.step2.valid) console.log("Form is valid");
    else console.log("Form is invalid");
    if (!this.step2) { return; }
    const form = this.step2;
    for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.formErrors[field] += messages[key] + ' ';
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
      this.router.navigateByUrl('/registration/page3');
      this.regForm.setStep2 = this.step2_data;
      //this.regForm.display();
    }
  }
}
