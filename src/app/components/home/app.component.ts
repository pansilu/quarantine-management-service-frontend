import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  fullScreen: boolean = true;

  constructor(router: Router) {
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
