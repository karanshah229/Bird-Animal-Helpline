import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecptDashboardComponent } from './recpt-dashboard/recpt-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VolDashboardComponent } from './vol-dashboard/vol-dashboard.component';
import { RaiseCaseComponent } from './recpt-dashboard/content/raise-case/raise-case.component';
import { MyCasesComponent } from './recpt-dashboard/content/my-cases/my-cases.component';
import { ContentWrapperComponent } from './recpt-dashboard/content/content-wrapper/content-wrapper.component';
import { MainNavComponent, All_notifications } from './recpt-dashboard/main-nav/main-nav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataChangeApprovalsComponent } from './recpt-dashboard/content/data-change-approvals/data-change-approvals.component';

@NgModule({
  declarations: [
    RecptDashboardComponent,
    AdminDashboardComponent,
    VolDashboardComponent,
    All_notifications,
    MainNavComponent,
    RaiseCaseComponent,
    MyCasesComponent,
    ContentWrapperComponent,
    DataChangeApprovalsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatRippleModule,
    FontAwesomeModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [
    All_notifications
  ],
})
export class DashboardModule { }
