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
    data: { roles: [roles.administrator] },
  },
  {
    path: 'quarantine',
    loadChildren: './quarantine/quarantine.module#QuarantineModule'
  }
  ,
  {
    path: 'home',
    loadChildren: '#'
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

