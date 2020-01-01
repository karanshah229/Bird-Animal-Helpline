import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { RecptDashboardComponent } from './recpt-dashboard/recpt-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VolDashboardComponent } from './vol-dashboard/vol-dashboard.component';
import { HeaderComponent } from './recpt-dashboard/header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainNavComponent, All_notifications } from './recpt-dashboard/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [RecptDashboardComponent, AdminDashboardComponent, VolDashboardComponent, HeaderComponent, All_notifications, MainNavComponent],
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
    MatBadgeModule
  ],
  entryComponents: [
    All_notifications
  ],
})
export class DashboardModule { }
