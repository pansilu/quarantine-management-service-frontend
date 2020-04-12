import { Injectable } from '@angular/core';
import { ErrorModel } from '../common/models/error-model';
import error from '../common/models/error-code';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _auth: AuthService, private _router: Router,private _toast: ToastService) { }

  Handler(e:ErrorModel){
    if(e.status == error.unauthorized){
      this._auth.logOut()
      this._router.navigate(['auth/login']);
    }
    else{

    }
    this._toast.error("Error",e.error.errorCode + " " + e.error.errorDesc)
  }
  
}
