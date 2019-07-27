import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../app/home/index/index.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { Registration1Component } from './home/registration1/registration1.component';
import { Registration2Component } from './home/registration2/registration2.component';
import { Registration3Component } from './home/registration3/registration3.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RegistrationGuard } from 'src/guards/registration.guard';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'page1' },
      { path: 'page1', component: Registration1Component },
      { path: 'page2', component: Registration2Component, canActivate: [RegistrationGuard] },
      { path: 'page3', component: Registration3Component, canActivate: [RegistrationGuard] },
      { path: '**', pathMatch: 'full', redirectTo: 'page1'  },
    ]
   },
  { path: 'home', component: IndexComponent },
  { path: 'signIn', component: SignInComponent },
  { path: '**', component: PageNotFoundComponent  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
