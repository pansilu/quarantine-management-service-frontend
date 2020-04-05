import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonGridComponent } from './components/person-grid/person-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditPersonComponent } from './components/add-edit-person/add-edit-person.component';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { AuthGuard } from '../Service/auth.guard';
import roles from '../Service/roles';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DailyUpdatesComponent } from './components/daily-updates/daily-updates.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';



const routes: Routes = [
  {
    path: 'quarantine-person',
    component: PersonGridComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator] },
  },
  {
    path: 'dailyUpdates/:id',
    component: DailyUpdatesComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator] },
  }
];


@NgModule({
  declarations: [PersonGridComponent, AddEditPersonComponent, DailyUpdatesComponent],
  imports: [
    AutocompleteLibModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [QuarantineService],
})
export class QuarantineModule { }
