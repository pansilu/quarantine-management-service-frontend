import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Service/auth.guard';
import { ChartsModule } from 'ng2-charts';
import { AgeChartComponent } from './components/age-chart/age-chart.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StationDistributionComponent } from './components/station-distribution/station-distribution.component';
import { QuarantinePersonDistributionComponent } from './components/quarantine-person-distribution/quarantine-person-distribution.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NewQuarantinePersonsDistributionComponent } from './components/new-quarantine-persons-distribution/new-quarantine-persons-distribution.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  declarations: [DashboardComponent, AgeChartComponent, StationDistributionComponent, QuarantinePersonDistributionComponent, NewQuarantinePersonsDistributionComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
