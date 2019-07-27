import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
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
