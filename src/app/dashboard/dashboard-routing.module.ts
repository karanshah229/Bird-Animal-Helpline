import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecptDashboardComponent } from './recpt-dashboard/recpt-dashboard.component';
import { RaiseCaseComponent } from './recpt-dashboard/content/raise-case/raise-case.component';
import { MyCasesComponent } from './recpt-dashboard/content/my-cases/my-cases.component';
import { DataChangeApprovalsComponent } from './recpt-dashboard/content/data-change-approvals/data-change-approvals.component';


const routes: Routes = [
  {
    path: '',
    component: RecptDashboardComponent,
    // canActivate: [],
    children: [
      { path: 'raise-case', component: RaiseCaseComponent },
      { path: 'my-cases', component: MyCasesComponent },
      { path: 'data-change-approvals', component: DataChangeApprovalsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
