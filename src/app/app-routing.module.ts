import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import roles from './Service/roles';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: { roles: [roles.administrator, roles.advance, roles.blender] },
  },
  {
    path: 'quarantine',
    loadChildren: './quarantine/quarantine.module#QuarantineModule'
  }
  ,
  {
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

