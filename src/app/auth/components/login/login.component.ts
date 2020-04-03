import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Service/toast.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  loading = false;
  submitted:boolean= false;

  constructor(private _authService: AuthService, private _router: Router, private _toast:ToastService) { }

  ngOnInit() {
    this._authService.logOut();
  }

  onLoginClick() {
    if (this.username && this.password) {
      this.loading = true;
      var model = new LoginModel()
      model.password = this.password
      model.username = this.username

      this._authService.tryToLogIn(data => {
        this.loading = false;
        this._router.navigate(['/home']);
      }, error => {
        this._toast.error('Login Failed!', 'Please check your username, password and try again.');
        this.loading = false;
      }, model);

      // this._router.navigate(['/home']);
      // this._router.navigate(['/home']);
    }
  }

  keyPress($event) {
    if ($event.keyCode === 13 && this.username && this.password) {
      this.onLoginClick();
    }
  }

  isValidUserName() {
    if (this.submitted) {
      if (!this.username) {
        return true
      }
      else {
        return false;
      }
    }
  }

  isValidPassword() {
    if (this.submitted) {
      if (!this.password) {
        return true
      }
      else {
        return false;
      }
    }
  }


}
