import { Component, OnInit } from '@angular/core';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import * as moment from 'moment';
// import { Moment } from 'moment';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { UserStationModel } from '../../models/user-station.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // selected: {startDate: Moment, endDate: Moment};
  enabled: boolean = false;
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

  selected = {start: moment().subtract(30, 'days'), end: moment() };
  locale: any = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'DD MMMM YYYY',
    separator: ' To ',
    cancelLabel: 'Cancel',
    applyLabel: 'Okay'
  }

  divitions = new Array<UserStationModel>();
  locations = new Array<NameIdModel>();
  selectedLocations = new Array<NameIdModel>();
  selectedDivition: number
  quserType:string = "BOTH"

  request: GraphDataRequestModel

  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    // this.request = new GraphDataRequestModel();
    // this.request.quserType = "BOTH";
    // this.request.divisionIds = [1];
    // this.request.stationIds = null;
    this.getLoacations()
  }

  getLoacations() {
    this._dashboardService.getLocations(
      d => {
        this.divitions = d
        this.locations = d[0].stations
        this.selectedLocations = d[0].stations
        this.selectedDivition = d[0].id
        this.draw()
      },
      e => { this._errorHandlerService.Handler(e) }
    )
  }

  draw() {
    this.request = new GraphDataRequestModel();
    this.request.quserType = this.quserType;
    this.selectedLocations.forEach(l => {
      this.request.stationIds.push(l.id);
    })
    this.request.divisionIds = [this.selectedDivition];
    this.request.startDate = this.selected.start.format('YYYY-MM-DD')
    this.request.endDate = this.selected.end.format('YYYY-MM-DD')
  }

  onSelectAll($event) {

  }

  onItemSelect($event) {

  }

  divisionSelected($event) {
    const id = +$event.target.value
    if (id) {
      this.selectedLocations = []
      this.locations = this.divitions[id].stations
    }
  }

}
