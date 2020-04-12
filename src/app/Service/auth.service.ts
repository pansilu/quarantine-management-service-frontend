import { timer as observableTimer } from 'rxjs';
import { UserActivationModel } from '../auth/models/user-activation.model';
import { PasswordResetModel } from '../auth/models/password-reset.model';
import { ErrorModel } from '../shared/models/errormodel';
import { SecurityHelper } from '../Service/security.helper';
import { LoginResultModel } from '../auth/models/login-result.model';
import { ErrorCallback, NextCallback, ServiceHelper } from '../Service/service.helper';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginModel } from '../auth/models/login.model';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {

    private _loggedUser: LoginResultModel;
    private _subscribtion: Subscription;
    public resetEmail = '';


    constructor(private _: ServiceHelper, private _securityHelper: SecurityHelper) { }

    get isOperator(): boolean {
        return this.getUserData().userData.userRole === 'ope';
    }
    get loggedUser(): LoginResultModel {
        return this.getUserData() ? this.getUserData().userData : null;
    }

    tryToLogIn(callback: NextCallback<LoginResultModel>, error: ErrorCallback<string>, data: LoginModel) {
        this.getToken(data, callback, error);
    }

    logOut() {
        // if (this.isLoggedIn) {
        //     this._.api()
        //         .url('api/user/loggedOut')
        //         .needJson().hasJson()
        //         .post(() => { this._.accessToken = null; }, e => { this._.accessToken = null; });
        // }

        this._loggedUser = null;
        localStorage.removeItem('userData');
        if (this._subscribtion && !this._subscribtion.closed) {
            this._subscribtion.unsubscribe();
        }
    }
    guidCheck(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, guid: string) {
        this._.api()
            .url(`api/user/guidcheck`)
            .get(next, error, `guid=${guid}`);
    }

    get isLoggedIn(): boolean {
        const data = this.getUserData();
        if (data) {
            const remainingTime = this.getRemainingTime(data.userData);
            if (remainingTime < 5000) {
                return false;
            }
            this.startTimer();
            this._.accessToken = data.userData.access_token;
            return true;
        } else {
            return false;
        }
    }

    private saveDataInTheLocalStorage() {
        const encrypted = this._securityHelper.encryptText(JSON.stringify(this._loggedUser));
        localStorage.setItem('userData', encrypted);
    }

    private getDataFromLocalStorage(): LoginResultModel {
        try {
            return this._loggedUser = new LoginResultModel(JSON.parse(this._securityHelper.decryptText(localStorage.getItem('userData'))));
        } catch (e) {
            return null;
        }
    }

    private getUserData(): { fromLocal: boolean, userData: LoginResultModel } {
        if (this._loggedUser) {
            return { fromLocal: true, userData: this._loggedUser };
        } else {
            const data = this.getDataFromLocalStorage();
            if (!data) {
                return null;
            }
            return { fromLocal: false, userData: data };
        }
    }

    private startTimer() {
        // if (this._subscribtion && !this._subscribtion.closed) {
        //     this._subscribtion.unsubscribe();
        // }
        // const data = this.getUserData();
        // if (data) {
        //     this._subscribtion = observableTimer(0, 2000)
        //         .subscribe((time) => {
        //             const remainingTime = this.getRemainingTime(data.userData);
        //             if (remainingTime < 5000) {
        //                 this._subscribtion.unsubscribe();
        //                 this.refresh();
        //             }
        //         });
        // }
    }

    private refresh() {
        // this.getToken(`grant_type=refresh_token&refresh_token=${this._loggedUser.refresh_token}`);
    }

    private getToken(data: LoginModel, callback: NextCallback<LoginResultModel> = null, error: ErrorCallback<string> = null) {
        this._.api()
            .url('api/user/authenticate')
            // .hasUrlencoded()
            // .rowData(rowData)
            .noAuth()
            .json(data)
            .post<LoginResultModel, string>((data) => {
                const token = data.token
                let tokenInfo = jwt_decode(token);
                // console.log(tokenInfo)
                const role = tokenInfo.roles[0].role
                data.createUser = tokenInfo.roles[0].createUser
                data.userRole = role
                data.userName = tokenInfo.name
                data.access_token = token
                data.userId = tokenInfo.userId
                data.expires_in = tokenInfo.exp
                data.loggedTime = new Date();
                // /* Only admin can login to this application */
                // if (role === 'Q_USER' ||role === 'GUARDIAN' ) {
                //     return error('Invalid user role');
                // }

                this._.accessToken = data.access_token;
                this._loggedUser = new LoginResultModel(data);
                this.saveDataInTheLocalStorage();
                // this.startTimer();

                if (callback) {
                    callback(this._loggedUser);
                }
            }, error);
    }

    private getRemainingTime(data) {
        return ((+data.expires_in * 1000) - new Date().getTime());
    }

    passwordResetRequested(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, username: string) {
        this._.api()
            .url('api/user/forgotpassword')
            .json({
                'username': username,
                'isRequestFromWeb': true
            })
            .post(next, error);
    }

    ActivateUser(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, activationModel: UserActivationModel) {
        this._.api()
            .url('api/user/activate')
            .json(activationModel)
            .post(next, error);
    }

    checkPasswordResetGuid(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, guid: string) {
        this._.api()
            .url(`api/user/validateresetpassword`)
            .json({
                'guidOrCode': guid
            })
            .post(next, error);
    }

    resetPassword(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, model: PasswordResetModel) {
        this._.api()
            .url(`api/user/resetpassword`)
            .json(model)
            .post(next, error);
    }

    changePassword(next: NextCallback<any>, error: ErrorCallback<ErrorModel>, token: string, password: string) {
        this._.api()
            .url('users/password')
            .json({
                passCodeToken: token,
                password: password
            })
            .post(next, error);
    }

    get userImage(): string {
        return this.loggedUser.userImage;
    }

    set userImage(newImage: string) {
        const data = this.loggedUser;
        data.userImage = newImage;
        this.saveDataInTheLocalStorage();
    }

}
