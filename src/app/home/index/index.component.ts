import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/animations/anim_registration';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  host: {
    '[@fadeIn]': 'true',
    'style': 'display: block;'
  },
  animations: [ fadeIn() ]
})
export class IndexComponent implements OnInit {

  aboutUs: Boolean = false;
  home: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleAboutUs(){
    this.aboutUs = !this.aboutUs;
    this.home = !this.home;
  }

}
