import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletionGuard implements CanActivate {

  //TODO: Get Profile Completion Status and redirect accordingly
  canActivate(): boolean {
    return true;
  }
}
