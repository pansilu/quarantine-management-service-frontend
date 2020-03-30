import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavSideBarComponent } from './components/nav-side-bar/nav-side-bar.component';


@NgModule({
  declarations: [NavBarComponent, NavSideBarComponent],
  imports: [
    CommonModule,
  ]
})
export class NavModule { }
