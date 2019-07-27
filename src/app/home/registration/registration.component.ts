import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  progress_bar: String[] = ["", "", "", "", ""];
  url: string;
  length;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if(event.url) {
        this.length = event.url.split("/").length - 1;
        this.url = event.url.split("/")[this.length];
      }
      if(this.url === "page1")  this.progress_bar = ["progress-bar-status", "", "", "", ""];
      else if (this.url === "page2") this.progress_bar = ["progress-bar-status", "progress-bar-status", "", "", ""];
      else if (this.url === "page3") this.progress_bar = ["progress-bar-status", "progress-bar-status", "progress-bar-status", "progress-bar-status", ""];
    });
  }

  ngOnInit() {
  }

  setURL(url){
    this.url = url;
  }

}
