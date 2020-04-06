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

  allowedPaths = Array<string>();
  userName: string;
  createUser:boolean
  constructor(public _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      // toggle sidebar
      $("#wrapper").toggleClass("menuDisplyed");
    });

    this.allowedPaths = this.getRoleDetails();
    this.userName = this._authService.loggedUser.userName;
    this.createUser = this._authService.loggedUser.createUser;
  }


  logOut() {
    this._authService.logOut();
    this._router.navigate([`auth/login`]);
  }

  isAllowed(currentPath: string) {
    const exist = this.allowedPaths.find(r => r === currentPath);
    if (exist) {
      return true;
    }
    return false;
  }

  isAllowedWithCanCreate(currentPath: string){
    const exist = this.allowedPaths.find(r => r === currentPath);
    if (exist && this.createUser) {
      return true;
    }
    return false;
  }

  getRoleDetails() {
    const paths = Array<string>();
    for (let i = 0; i < this._router.config.length; i++) {
      if (this._router.config[i].data) {
        const roles = this._router.config[i].data['roles'] as Array<string>;
        const role = roles.find(r => r === this._authService.loggedUser.userRole);
        if (role) {
          paths.push(this._router.config[i].path);
        }
      }
    }
    return paths;
  }

}
