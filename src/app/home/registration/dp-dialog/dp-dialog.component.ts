import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dp-dialog',
  templateUrl: './dp-dialog.component.html',
  styleUrls: ['./dp-dialog.component.scss']
})
export class DpDialogComponent implements OnInit {

  imagePreview: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public sanitizer: DomSanitizer) {
    this.imagePreview = data.image;
  }

  ngOnInit() {
  }

}
