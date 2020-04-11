import { Component, OnInit } from '@angular/core';
import { NameIdModel } from 'src/app/shared/models/name-id.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

  locations = new Array<NameIdModel>();
  selectedLocations = new Array<NameIdModel>();
  constructor() { }

  ngOnInit() {
  }

}
