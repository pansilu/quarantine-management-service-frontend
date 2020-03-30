import { Component, OnInit } from '@angular/core';

declare var $:any
@Component({
  selector: 'nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss']
})
export class NavSideBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".sidebar-nav li").on("click", function () {
      $(".sidebar-nav li").removeClass("active");  
      $(this).addClass("active");
  });
  }

}
