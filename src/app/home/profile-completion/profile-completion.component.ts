import { Component, OnInit } from '@angular/core';
import { flyInOut } from 'src/animations/anim_registration';
import { home_addr } from 'src/data/profile_completion/profile_cmpl';
import { work_addr } from 'src/data/profile_completion/profile_cmpl2';
import { pick_up_locations } from 'src/data/profile_completion/profile_cmpl3';
import { ProfileCompletionDataService } from 'src/services/Profile_Completion/profile-completion-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'true',
    '[class.dashboard-theme]':'false'
  },
  animations: [ flyInOut() ]
})
export class ProfileCompletionComponent implements OnInit {

  home_addr: home_addr;
  home_address: FormGroup;
  work_addr: work_addr;
  work_address: FormGroup;
  pick_up_loc: pick_up_locations;
  pick_up_locations: FormGroup;

  //HOME_ADDRESS
  pincode_regex: string = "[0-9]{6}";
  mobileNo_regex: string = "([6-9]{1}[0-9]{9}";

  constructor(private prfl_cmpl: ProfileCompletionDataService, private fb: FormBuilder) {
    this.create_homeAddr_form();
    this.create_workAddr_form();
   }

  ngOnInit() {
  }

  home_address_formErrors = {
    fullName: '',
    addr_line1: '',
    addr_line2: '',
    pincode: '',
    alt_number: ''
  };

  home_address_validationMessages = {
    fullName: {
      minlength: 'Min length - 2',
      maxlength: 'Max Length - 25'
    },
    addr_line1: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 25'
    },
    addr_line2: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 25'
    },
    pincode: {
      required: 'Pincode required',
      pattern:  'Enter valid pincode'
    },
    alt_number: {
      pattern: 'Enter valid 10 digit mobile no.'
    }
  };

  create_homeAddr_form(){
    this.home_address = this.fb.group({
      fullName: ['',[Validators.minLength(2), Validators.maxLength(25)]],
      addr_line1: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      addr_line2: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      pincode: [null, [Validators.required, Validators.pattern(this.pincode_regex)]],
      alt_number: [null, [Validators.pattern(this.mobileNo_regex)]]
    });

    this.home_address.valueChanges
      .subscribe(data => this.onValueChanged_homeAddr(data));
  }

  onValueChanged_homeAddr(data?: any) {
    if (!this.home_address) { return; }
    const form = this.home_address;
    for (const field in this.home_address_formErrors) {
        if (this.home_address_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.home_address_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.home_address_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                      this.home_address_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  create_workAddr_form(){

  }

}
