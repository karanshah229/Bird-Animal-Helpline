import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { fadeIn, fadeOut } from 'src/animations/anim_registration';
import { IsMobileService } from 'src/services/Common/is-mobile.service';

@Component({
  selector: 'app-raise-case',
  templateUrl: './raise-case.component.html',
  styleUrls: ['./raise-case.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'false',
    '[class.dashboard-theme]':'true'
  },
  animations: [ fadeIn(), fadeOut() ]
})
export class RaiseCaseComponent implements OnInit {

  isMobile: boolean
  images: any[5] = []
  bird_or_animal:string = "Bird/Animal"
  add_new_bird_animal_type: boolean = false

  constructor(
    public dialog: MatDialog,
    private isMobile_t: IsMobileService) { }

  ngOnInit() {
    this.isMobile_t.isMobile().subscribe(result => {
    if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
  }

  //TODO: Implement Select Bird/Animal Type - Service

  //TODO: Implement Add new Bird/Animal Type
  add_bird_animal(){
    this.add_new_bird_animal_type = true
  }

  bird_or_animal_fn(val: boolean){
    if (val == true) this.bird_or_animal = "Bird"
    else this.bird_or_animal = "Animal"
  }

  // step2_formErrors = {
  //   firstName: '',
  // };

  // step2_validationMessages = {
  //   firstName: {
  //     required:      'First Name is required',
  //     minlength:     'Min length - 2',
  //     maxlength:     'Max Length - 25'
  //   },
  //   dob: {
  //     required:      'Date of Birth is required',
  //     pattern:       'Invalid Date of Birth'
  //   },
  //   email: {
  //     required:      'Email is required',
  //     email:         'Email not in valid format',
  //   },
  // };

  // create_step2_form(){
  //   this.step2 = this.fb.group({
  //     firstName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  //     lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  //     dob: [[Validators.required]],
  //     countryCode: [{value: '+91', disabled:true}],
  //     mobileNumber: [null, [Validators.required, Validators.pattern]],
  //     gender: ['', [Validators.required]],
  //     emailID: ['', [Validators.required, Validators.email]],
  //     securityQuestion: [null, Validators.required],
  //     securityResponse: ['',[Validators.required] ]
  //   });

  //   this.step2.valueChanges
  //       .subscribe(data => this.onValueChanged_step2(data));
  // }

  // onValueChanged_step2(data?: any) {
  //   if (!this.step2) { return; }
  //   const form = this.step2;
  //   for (const field in this.step2_formErrors) {
  //       if (this.step2_formErrors.hasOwnProperty(field)) {
  //           // clear previous error messages if any
  //           this.step2_formErrors[field] = '';
  //           const control = form.get(field);
  //           if (control && control.dirty && !control.valid) {
  //               const messages = this.step2_validationMessages[field];
  //               for (const key in control.errors) {
  //                   if (control.errors.hasOwnProperty(key)) {
  //                     this.step2_formErrors[field] += messages[key] + ' ';
  //                   }
  //               }
  //           }
  //       }
  //   }
  // }

  // submitStep2(){
  //   if(this.step2.valid) {
  //     this.step2_data = this.step2.value;
  //     this.regForm.setStep2 = this.step2_data;
  //     this.dateOfBirth = this.step2_data.dob.getDate().toString() + '/' + (this.step2_data.dob.getMonth() + 1).toString() + '/' + this.step2_data.dob.getFullYear();
  //   }
  // }

  reset_form(){
    //this.myForm.reset();
  }


  case_photos_dialog_ref:any
  case_photos_dialog() {
    let dialogSize = { height: '80%', width: '40%' }
    if(this.isMobile){
      dialogSize = { height: '50%', width: '80%' }
    }

    this.case_photos_dialog_ref = this.dialog.open(CasePhotosDialog, {
      height: dialogSize.height,
      width: dialogSize.width,
      data: this.images,
      disableClose: true
    });

    this.case_photos_dialog_ref.afterClosed().subscribe(result => {
      this.images = result;
      console.log(this.images)
    });
  }
}


@Component({
  selector: 'case-photos-dialog',
  templateUrl: 'case-photos-dialog.html'
})
export class CasePhotosDialog implements OnInit {
  isMobile: boolean
  loading_previews: boolean = false

  constructor(
    public dialogRef: MatDialogRef<CasePhotosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: File[] | string | ArrayBuffer,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private isMobile_t: IsMobileService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
      console.log(this.data)
    }

  ngOnInit(){
    this.isMobile_t.isMobile().subscribe(result => {
    if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
    this.loading_previews = true;
    for(let i = 0; i < (this.data as File[]).length; i++){
      this.getImagePreview(this.data[i]);
      this.loading_previews = false;
    }
    this.loading_previews = false;
  }

  ip = 0
  imagePreview: any[5] = []
  getImagePreview(file: File) {
    if(file != null){
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => this.imagePreview[this.ip++] = reader.result;
    }
  }

  add_case_photo($event){
    if($event.target.files[0]){
      this.case_photos_status[this.c] = "Uploading"
      this.case_photos($event.target.files[0])
    }
  }

  removeImage(i: number){
    (this.data as File[]).splice(i, 1)
    this.ip = 0
    this.imagePreview = []
    this.ngOnInit()
  }

  c = (this.data as File[]).length
  compressionError:string
  case_photos_status:string[] = []
  case_photos(image){
    if(image == undefined) return;
    else {
      this.case_photos_status[this.c] = "Resizing"
      this.ng2ImgMax.resizeImage(image, 10000, 800).subscribe(
        result => {
          this.case_photos_status[this.c] = "Compressing"
          this.ng2ImgMax.compressImage(result, 5.00).subscribe(
            result => {
              this.data[this.c] = new File([result], result.name);
              this.compressionError = undefined;
              this.getImagePreview(result);
              this.case_photos_status[this.c] = "Done"
              let temp = this.c
              setTimeout(()=>{this.case_photos_status[temp] = null}, 750)
              this.c++
            },
            error => {
              this.compressionError = error.reason;
              console.log('Error Compessing Image: ', error);
              alert(this.compressionError)
            }
          );
        },
        error => {
          this.compressionError = error.reason;
          console.log("Error Resizing Image: ", error);
          alert(this.compressionError)
        }
      );
    }
  }

}
