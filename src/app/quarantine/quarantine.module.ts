import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonGridComponent } from './components/person-grid/person-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditPersonComponent } from './components/add-edit-person/add-edit-person.component';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { AuthGuard } from '../Service/auth.guard';



const routes: Routes = [
  {
    path:'quarantine-person',
    component:PersonGridComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [PersonGridComponent, AddEditPersonComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [QuarantineService],
})
export class QuarantineModule { }
