import { Component, OnInit } from '@angular/core';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // selected: {startDate: Moment, endDate: Moment};
  enabled:boolean = false;
  dropdownSettings = {
    singleSelection: false,
    enableCheckAll: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  selected: {start: Moment, end: Moment};
  locale: any = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'DD MMMM YYYY',
    separator: ' To ',
    cancelLabel: 'Cancel',
    applyLabel: 'Okay'
  }
  locations = new Array<NameIdModel>();
  selectedLocations = new Array<NameIdModel>();
  constructor() { }

  ngOnInit() {
  }

  draw(){
    console.log(this.selected)
  }

}
