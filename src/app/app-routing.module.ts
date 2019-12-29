import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './home/registration/registration.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileCompletionComponent } from './home/profile-completion/profile-completion.component';
import { ProfileCompletionGuard } from 'src/guards/profile-completion.guard';
import { ForgotPINComponent } from './home/forgot_pin/forgot-pin.component';
import { OfflineComponent } from './offline-page/offline.component';


const routes: Routes = [
  { path: 'forgotPIN', component: ForgotPINComponent },
  { path: 'profileCompletion',
    component: ProfileCompletionComponent,
    canActivate: [ProfileCompletionGuard]
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'HdbHb6HGLIsBNQlt5MjHUr346y5R8B5g', component: OfflineComponent },
  { path: '', component: SignInComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
