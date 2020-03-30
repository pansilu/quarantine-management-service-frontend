import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

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

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.logOut();
  }

  onLoginClick() {
    if (this.username && this.password) {
      /*this.loading = true;
      this._authService.tryToLogIn(data => {
        this.loading = false;
        this._router.navigate(['/home']);
      }, error => {
        // this._toast.error('Login Failed!', 'Please check your username, password and try again.');
        this.loading = false;
      }, this.username, this.password);

      this._router.navigate(['/home']);*/
      this._router.navigate(['/home']);
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
