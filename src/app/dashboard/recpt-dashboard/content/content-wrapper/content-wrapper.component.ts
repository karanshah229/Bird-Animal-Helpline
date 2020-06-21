import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements OnInit {
  isHandset$: Subscription;
  isMobile:boolean = false;

  card_title = new BehaviorSubject('Raise a Case')

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.isHandset$ = this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let url = ''
      if (event instanceof NavigationEnd){
        url = event.url.split('/')[2];
      }
      if (url == 'raise-case') this.card_title.next('Raise a Case')
      else if (url == 'my-cases') this.card_title.next('My Cases')
      else if (url == 'data-change-approvals') this.card_title.next('Data Change Approvals')
    });


  }

}
