import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { ServiceHelper } from '../Service/service.helper';
import { SecurityHelper } from '../Service/security.helper';





@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, ServiceHelper, SecurityHelper],
    };
  }
}
