import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Service/toast.service';

declare var $: any
@Component({
  selector: 'nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss']
})
export class NavSideBarComponent implements OnInit {

  allowedPaths = Array<string>();
  userName: string;

  constructor(public _authService: AuthService, private _router: Router,
    public _toast: ToastService) { }

  ngOnInit() {
    this.allowedPaths = this.getRoleDetails();
    this.userName = this._authService.loggedUser.userName;
  }

  isAllowed(currentPath: string) {
    const exist = this.allowedPaths.find(r => r === currentPath);
    if (exist) {
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
