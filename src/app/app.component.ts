import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bird Animal Helpline';
  isConnected: boolean = true;
  imageToShow: any;

  constructor(private connectionService: ConnectionService,
              private _location: Location,
              private router: Router) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this._location.back();
      }
      else {
        this.router.navigateByUrl('/HdbHb6HGLIsBNQlt5MjHUr346y5R8B5g');
      }
    });
  }

  ngOnInit() {
  }
}
