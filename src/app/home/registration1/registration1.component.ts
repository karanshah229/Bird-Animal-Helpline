import { Component, OnInit } from '@angular/core';
import { flyInOut } from 'src/animations/anim_registration';
@Component({
  selector: 'app-registration1',
  templateUrl: './registration1.component.html',
  styleUrls: ['./registration1.component.scss']
})

export class Registration1Component implements OnInit {

  //Preview
  previewData: boolean = false;
  sec_response_hide: boolean = true;
  pass_pin_hide: boolean = true;
  image: any;
  show_loading_gif: boolean = false;

  ngOnInit(){

  }

}
