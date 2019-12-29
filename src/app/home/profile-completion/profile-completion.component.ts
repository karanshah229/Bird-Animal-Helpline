import { Component, OnInit, ViewChild } from '@angular/core';
import { flyInOut } from 'src/animations/anim_registration';
import { ProfileCompletionDataService } from 'src/services/Profile_Completion/profile-completion-data.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PincodesService } from 'src/services/Profile_Completion/pincodes.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { home_addr } from 'src/data/profile_completion/profile_cmpl';
import { work_addr } from 'src/data/profile_completion/profile_cmpl2';
import { pick_up_locations } from 'src/data/profile_completion/profile_cmpl3';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

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

  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  //HOME_ADDRESS
  home_address: FormGroup;
  home_addr: home_addr;
  pincode_regex: string = "[4]{1}[0]{2}[0-9]{3}";
  mobileNo_regex: string = "[6-9]{1}[0-9]{9}";

  //WORK_ADDRESS
  work_address: FormGroup;
  work_addr: work_addr;
  nature_of_business_options = ["Businessman / Professional", "Employee", "Housewife", "Other"];

  //PICK_UP_LOCATIONS
  pick_up_locations: FormGroup;
  pick_up_loc: pick_up_locations;
  pincodes: any;
  pincode_area_t: string[] = [];
  specify_timings: [boolean] = [false];
  selected_pincodes: string[] = [];
  snackBar_count: boolean = false;
  no_pincodes_selected_msg: string;

  //PREVIEW
  display_preview: boolean = false;
  submit_status: boolean = false;
  submit_failure: boolean = false;
  Form_Submission_Error_Msg: string;
  prfl_cmpl_success: boolean = false;

  constructor(private prfl_cmpl: ProfileCompletionDataService,
              private fb: FormBuilder,
              private pin: PincodesService,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
              private router: Router) {
    this.create_homeAddr_form();
    this.create_workAddr_form();
    this.create_pic_up_loc_form();
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
      maxlength: 'Max length - 50'
    },
    addr_line2: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 50'
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
      addr_line1: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      addr_line2: ['', [Validators.minLength(2), Validators.maxLength(50)]],
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

  submitStep1(){
    this.home_addr = this.home_address.value;
    this.prfl_cmpl.home_addr = this.home_address.value;
  }

  work_address_formErrors = {
    office_name: '',
    addr_line1: '',
    addr_line2: '',
    pincode: '',
    nature_of_business: '',
    additional_work_info: ''
  };

  work_address_validationMessages = {
    office_name: {
      minlength: 'Min length - 2',
      maxlength: 'Max Length - 25'
    },
    addr_line1: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 50'
    },
    addr_line2: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 50'
    },
    pincode: {
      required: 'Pincode required',
      pattern:  'Enter valid pincode'
    },
    nature_of_business: {
      required: 'Select one option'
    },
    additional_work_info: {
      minlength: 'Min length - 2',
      maxlength: 'Max length - 25'
    }
  };

  create_workAddr_form(){
    this.work_address = this.fb.group({
      office_name: ['',[Validators.minLength(2), Validators.maxLength(25)]],
      addr_line1: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      addr_line2: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      pincode: [null, [Validators.required, Validators.pattern(this.pincode_regex)]],
      nature_of_business: ['', [Validators.required]],
      additional_work_info: ['', [Validators.minLength(2), Validators.maxLength(25)]]
    });

    this.work_address.valueChanges
      .subscribe(data => this.onValueChanged_workAddr(data));
  }

  onValueChanged_workAddr(data?: any) {
    if (!this.work_address) { return; }
    const form = this.work_address;
    for (const field in this.work_address_formErrors) {
        if (this.work_address_formErrors.hasOwnProperty(field)) {
            // clear previous error messages if any
            this.work_address_formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.work_address_validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                      this.work_address_formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  submitStep2(){
    this.work_addr = this.work_address.value;
    this.prfl_cmpl.work_addr = this.work_address.value;
  }

  create_pic_up_loc_form(){
    this.pick_up_locations = this.fb.group({
      autoComplete_input: [],
      locations: this.fb.array([])
    });

    this.pick_up_locations.controls['autoComplete_input'].valueChanges.subscribe(value => {
      this.pincodes = this.pin.getPincodes(value);
    });
  }

  get pick_up_locs(){
    return this.pick_up_locations.get('locations') as FormArray
  }

  addLocation(pincode: any){
    const pincode_area_value = (pincode.Pincode + " - " + pincode.Area).toString();
    const loc = this.fb.group({
      pincode_area: [{value: pincode_area_value, readOnly: true}],
      start_time: [],
      end_time: []
    });

    this.pick_up_locs.push(loc);

    this.pincode_area_t.push((pincode.Pincode + " - " + pincode.Area).toString());
    this.selected_pincodes.push(pincode);
    this.snackBar_count = true;
    this.updatePincodesList(pincode);
  }

  updatePincodesList(pincode){
    this.pin.updatePincodesList(pincode);
  }

  addPincodeBack(i){
    this.pin.addPincodeBack(this.selected_pincodes[i]);
  }

  deleteLocation(i){
    this.pick_up_locs.removeAt(i);
    this.selected_pincodes.splice(i,1);
    this.pincode_area_t.splice(i,1);
  }

  specifyTimings(i) {
    this.specify_timings[i] = !this.specify_timings[i];
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PreviewSnackbarComponent);
  }

  preview_t(){
    if(!this.snackBar_count == true) {
      this.snackBar_count = true;
      this.pick_up_loc = this.pick_up_locations.value;
      this.prfl_cmpl.pick_up_loc = this.pick_up_locations.value;
      this.display_preview = true;
      this.openSnackBar();
    }else {
      this.pick_up_loc = this.pick_up_locations.value;
      this.prfl_cmpl.pick_up_loc = this.pick_up_locations.value;
      this.display_preview = true;
      if(this.pick_up_loc.locations.length == 0) this.no_pincodes_selected_msg = "No pincodes selected.";
    }
  }

  preview_t2(){
    if(this.snackBar_count == true)
      this.stepper.next();
  }

  selectionChange($event){
    if($event.selectedIndex == 3){
      this.submitStep1();
      this.submitStep2();
    }
  }

  submitPreview(){
    this.submit_status = true;
    this.submit_failure = false;
    const fd = new FormData();
    fd.append("Home Address", JSON.stringify(this.home_addr));
    fd.append("Work Address", JSON.stringify(this.work_addr));
    fd.append("Pick Up Locations", JSON.stringify(this.pick_up_loc));
    //TODO: URL for Profile Completion
    this.http.post('http://birdhelpline.com/registration', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe( (event) => {
        if(event.type === 0){
          this.submit_status = false;
          this.submit_failure = true;
          this.Form_Submission_Error_Msg = "Error saving details. Please try again!";
        }
        if(event.type === HttpEventType.Response){
          this.prfl_cmpl_success = true;
          console.log(event);
          console.log("Registration Successfull");
        }
      });
  }

  reg_complete(){
    this.router.navigateByUrl('/home');
  }

}

@Component({
  selector: 'preview_snackbar',
  template: `<span style="letter-spacing: 1px">You have not selected any pincodes.</span><br><span>Do you wish to continue?</span><br> <button mat-raised-button style="float: right" (click)="dismiss()">OK<button>`
})

export class PreviewSnackbarComponent {

  constructor(private _snackRef: MatSnackBarRef<PreviewSnackbarComponent>) { }

  dismiss(){
    this._snackRef.dismiss();
  }
}
