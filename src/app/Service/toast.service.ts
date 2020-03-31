import { AppComponent } from '../components/home/app.component';
import { NotificationsService } from 'angular2-notifications';

export class ToastService {

   private _settings = {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 250
    };

    /* public static methods */
    public success(title: string, message?: string) {
        AppComponent.notificationService.success(
            title,
            message,
            this._settings
        );
    }

    public error(title: string, message: string) {
        AppComponent.notificationService.error(
            title,
            message,
            this._settings
        );
    }

    public information(title: string, message: string) {
        AppComponent.notificationService.info(
            title,
            message,
            this._settings
        );
    }
}
