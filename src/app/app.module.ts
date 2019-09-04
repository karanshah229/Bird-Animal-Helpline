import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { ProfileCompletionComponent, PreviewSnackbarComponent } from './home/profile-completion/profile-completion.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileCompletionGuard } from 'src/guards/profile-completion.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ProfileCompletionComponent,
    SignInComponent,
    PageNotFoundComponent,
    DpDialogComponent,
    PreviewSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  	FlexLayoutModule,
  	BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatProgressBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DpDialogComponent,
    PreviewSnackbarComponent
  ],
  providers: [
    MatDatepickerModule,
    ProfileCompletionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
