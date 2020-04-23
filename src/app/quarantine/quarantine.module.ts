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
import { NewOfficerComponent } from './components/new-officer/new-officer.component';
import { AddressSearchMapComponent } from './components/address-search-map/address-search-map.component';
import { AgmCoreModule } from '@agm/core';




const routes: Routes = [
  {
    path: 'quarantine-person',
    component: PersonGridComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator, roles.root] },
  },
  {
    path: 'dailyUpdates/:id',
    component: DailyUpdatesComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator, roles.root] },
  },
  {
    path: 'add-edit/:id',
    component: AddEditPersonComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator, roles.root] },
  },
  {
    path: 'map',
    component: AddressSearchMapComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator, roles.root] },
  }
];


@NgModule({
  declarations: [PersonGridComponent, AddEditPersonComponent, DailyUpdatesComponent, NewOfficerComponent, AddressSearchMapComponent],
  imports: [
    AutocompleteLibModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPs5O5dn7S01WPLt_O6dWnGwt3nm97xQM',
      libraries: ['places']
    })
  ],
  providers: [QuarantineService],
})
export class QuarantineModule { }
