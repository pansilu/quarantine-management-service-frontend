import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

declare var $: any
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public _authService: AuthService,private _router: Router) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      // toggle sidebar
      $("#wrapper").toggleClass("menuDisplyed");
    });
  }


  logOut() {
    this._authService.logOut();
    this._router.navigate([`auth/login`]);
}

}
