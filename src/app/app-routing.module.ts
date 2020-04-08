import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import roles from './Service/roles';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: { roles: [roles.administrator,roles.root] },
  },
  {
    path: 'quarantine',
    loadChildren: './quarantine/quarantine.module#QuarantineModule',
    data: { roles: [roles.administrator,roles.root] },
  }
  ,
  {
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

