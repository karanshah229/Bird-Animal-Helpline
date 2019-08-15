import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut } from 'src/animations/anim_registration';
import { RegForm_step3 } from 'src/data/registration/regForm_step3';
import { Router } from '@angular/router';
import { RegFormService } from 'src/services/reg-form.service';

@Component({
  selector: 'app-registration3',
  templateUrl: './registration3.component.html',
  styleUrls: ['./registration3.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
  animations: [ flyInOut() ]
})
export class Registration3Component implements OnInit {

  step3: FormGroup;
  step3_data: RegForm_step3;

  constructor(private fb: FormBuilder,
              private router: Router,
              private regForm: RegFormService) {
      this.createForm();
  }

  formErrors = {
    username: '',
    pin: ''
  };

  validationMessages = {
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
  }

  createForm(){
    this.step3 = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)] ],
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ]
    });

    this.step3.valueChanges
        .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any){
    if(this.step3.valid) console.log("Form is valid");
    else console.log("Form is invalid");
    if (!this.step3) { return; }
    const form = this.step3;
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

  submitStep3(){
    //console.log(this.step2.value);
    this.step3_data = this.step3.value;
    if(this.step3.valid) {
      this.router.navigateByUrl('/preview');
      this.regForm.setStep3 = this.step3_data;
      //this.regForm.display();
    }
  }

}
