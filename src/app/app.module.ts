import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/home/app.component';
import { NavBarComponent } from './components/nav/components/nav-bar/nav-bar.component';
import { NavSideBarComponent } from './components/nav/components/nav-side-bar/nav-side-bar.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
    providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
