import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { IndexComponent } from './home/index/index.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { ProfileCompletionComponent } from './home/profile-completion/profile-completion.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { Registration2Component } from './home/registration2/registration2.component';
import { Registration3Component } from './home/registration3/registration3.component';
import { ProfileCompletion2Component } from './home/profile-completion2/profile-completion2.component';
import { ProfileCompletion3Component } from './home/profile-completion3/profile-completion3.component';
import { Registration1Component } from './home/registration1/registration1.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RegistrationAccessService } from 'src/services/registration-access.service';
import { RegistrationGuard } from 'src/guards/registration.guard';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrationComponent,
    ProfileCompletionComponent,
    SignInComponent,
    Registration2Component,
    Registration3Component,
    ProfileCompletion2Component,
    ProfileCompletion3Component,
    Registration1Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  	FlexLayoutModule
  ],
  providers: [
    RegistrationAccessService,
    RegistrationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
