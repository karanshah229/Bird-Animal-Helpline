import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recpt-dashboard',
  templateUrl: './recpt-dashboard.component.html',
  styleUrls: ['./recpt-dashboard.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'false',
    '[class.dashboard-theme]':'true'
  },
  animations: [ ]
})
export class RecptDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
