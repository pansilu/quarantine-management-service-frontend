import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Service/auth.guard';
import roles from '../Service/roles';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'user',
    component:UserGridComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator] },
  },
  {
    path:'user/:id',
    component:AddEditUserComponent,
    canActivate: [AuthGuard],
    data: { roles: [roles.administrator] },
  }
];

@NgModule({
  declarations: [UserGridComponent, AddEditUserComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
