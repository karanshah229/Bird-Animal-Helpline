import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from 'src/animations/anim_registration';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
  animations: [ fadeIn() ]
})
export class SignInComponent implements OnInit {

  aboutUs: Boolean = false;
  home: Boolean = true;

  signIn: FormGroup;
  hide_pass: boolean = true;

  constructor(private fb: FormBuilder) {
    this.create_signInForm();
  }

  ngOnInit() {
  }

  toggleAboutUs(){
    this.aboutUs = !this.aboutUs;
    this.home = !this.home;
  }

  signIn_formErrors = {
    username: '',
    pin: ''
  };

  signIn_validationMessages = {
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

  create_signInForm(){
    this.signIn = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)] ],
      pin: ['', [Validators.required] ]
    });

    this.signIn.valueChanges
        .subscribe(data => this.onValueChanged_signIn(data));
  }

  onValueChanged_signIn(data?: any){
    if (!this.signIn) { return; }
    const form = this.signIn;
    for (const field in this.signIn_formErrors) {
        if (this.signIn_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.signIn_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.signIn_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.signIn_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

}
