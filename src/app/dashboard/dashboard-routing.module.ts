import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecptDashboardComponent } from './recpt-dashboard/recpt-dashboard.component';


const routes: Routes = [
  { path: '',
    component: RecptDashboardComponent/*,
    canActivate: [],
    children: [{}]*/
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
