import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'false',
    '[class.dashboard-theme]':'true'
  }
})
export class OfflineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
