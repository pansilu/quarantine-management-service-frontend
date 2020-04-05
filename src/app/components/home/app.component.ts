import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  options = {
    position: ["top", "right"],
  }

  title = 'client';
  fullScreen: boolean = true;
  public static notificationService: NotificationsService;

  constructor(router: Router, notificationService: NotificationsService) {
    AppComponent.notificationService = notificationService;
    
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = (router.routerState.snapshot.root.children[0].url as any);
        this.fullScreen = url[0].path == 'auth';

        if (this.fullScreen) {
          $("#wrapper").removeClass("menuDisplyed");
        }

      }
    });
  }
}
