import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../app/home/index/index.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileCompletionComponent } from './home/profile-completion/profile-completion.component';
import { ProfileCompletionGuard } from 'src/guards/profile-completion.guard';


const routes: Routes = [
  { path: 'profileCompletion', component: ProfileCompletionComponent, canActivate: [ProfileCompletionGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: IndexComponent },
  { path: 'signIn', component: SignInComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
