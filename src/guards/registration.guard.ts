import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RegistrationAccessService } from 'src/services/registration-access.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate{

  constructor(private regAccess: RegistrationAccessService,
              private _router: Router){ }

  canActivate(): boolean{
    if (this.regAccess.access) return true;
    else {
      this._router.navigate(['/registration/page1']);
      return false;
    }
  }
}
