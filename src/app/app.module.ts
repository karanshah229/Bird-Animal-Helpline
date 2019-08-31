import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { IndexComponent } from './home/index/index.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { ProfileCompletionComponent } from './home/profile-completion/profile-completion.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { ProfileCompletion2Component } from './home/profile-completion2/profile-completion2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DpDialogComponent } from './home/registration/dp-dialog/dp-dialog.component';

import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProfileCompletionGuard } from 'src/guards/profile-completion.guard';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrationComponent,
    ProfileCompletionComponent,
    SignInComponent,
    ProfileCompletion2Component,
    PageNotFoundComponent,
    DpDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  	FlexLayoutModule,
  	BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatStepperModule,
    Ng2ImgMaxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  entryComponents: [
    DpDialogComponent
  ],
  providers: [
    MatDatepickerModule,
    ProfileCompletionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
