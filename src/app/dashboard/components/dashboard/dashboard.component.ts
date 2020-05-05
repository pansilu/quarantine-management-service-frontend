import { Component, OnInit } from '@angular/core';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import * as moment from 'moment';
// import { Moment } from 'moment';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { UserStationModel } from '../../models/user-station.model';
import GraphTypes from '../../models/GraphTypes'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // selected: {startDate: Moment, endDate: Moment};
  graph = GraphTypes;
  activeGraph: string = GraphTypes.age;
  enabled: boolean = false;
  covidCaseType: string = "ALL";
  selected = { start: moment().subtract(30, 'days'), end: moment() };
  provice: any = null;
  district: any = null;
  division: any = null;
  gnd: any = null;

  dropdownSettings = {
    singleSelection: false,
    enableCheckAll: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  selectedDistricts = new Array<NameIdModel>();
  allDistricts: Array<NameIdModel> = new Array<NameIdModel>();
  provices: Array<NameIdModel> = new Array<NameIdModel>();
  districts: Array<NameIdModel> = new Array<NameIdModel>();
  divisions: Array<NameIdModel> = new Array<NameIdModel>();
  gnds: Array<NameIdModel> = new Array<NameIdModel>();

  locale: any = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'DD MMMM YYYY',
    separator: ' To ',
    cancelLabel: 'Cancel',
    applyLabel: 'Okay'
  }

  request: GraphDataRequestModel

  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.getprovinces()
    this.getAllDistricts();
  }

  initGraph() {
    this.request = new GraphDataRequestModel();
    this.request.covidCaseType = "ALL";
    this.selectedDistricts.forEach(e => {
      this.request.districtIdList.push(e.id)
    });
  }

  getprovinces() {
    this._dashboardService.getprovinces(
      d => {
        this.provices = d;
      },
      e => { this._errorHandlerService.Handler(e) }
    )
  }

  getDistricts(id: number) {
    this._dashboardService.getDistricts(
      d => {
        this.districts = d;
      },
      e => { this._errorHandlerService.Handler(e) }
      , id)
  }

  getAllDistricts() {
    this._dashboardService.getAllDistricts(
      d => {
        this.allDistricts = d;
        this.selectedDistricts = d;
        this.initGraph();
      },
      e => {
        this._errorHandlerService.Handler(e)
        this.initGraph();
      }
    )
  }

  getDivisions(id: number) {
    this._dashboardService.getDivisions(
      d => {
        this.divisions = d;
      },
      e => { this._errorHandlerService.Handler(e) }
      , id)
  }

  getGnds(id: number) {
    this._dashboardService.getGnds(
      d => {
        this.gnds = d;
      },
      e => { this._errorHandlerService.Handler(e) }
      , id)
  }

  onProvinceChange($event) {
    this.districts = new Array<NameIdModel>()
    this.divisions = new Array<NameIdModel>()
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getDistricts(id);
    this.district = null
    this.division = null
    this.gnd = null
  }

  onDistrictChange($event) {
    this.divisions = new Array<NameIdModel>()
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getDivisions(id);
    this.division = null
    this.gnd = null
  }

  onDsDivisionChange($event) {
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getGnds(id);
    this.gnd = null
  }

  onGndIdSelect($event) {
    // const id = $event.target.value;
  }


  draw() {
    this.request = new GraphDataRequestModel();
    this.request.provinceId = this.provice;
    this.request.districtId = this.district;
    this.request.divisionId = this.division;
    this.request.gndId = this.gnd;
    this.request.covidCaseType = this.covidCaseType;
    this.request.startDate = this.selected.start.format('YYYY-MM-DD')
    this.request.endDate = this.selected.end.format('YYYY-MM-DD')
    this.request.districtIdList = new Array<number>();

    if (this.selectedDistricts.length > 0) {
      this.selectedDistricts.forEach(e => {
        this.request.districtIdList.push(e.id)
      });
    }
    else {
      this.request.districtIdList = null;
    }
  }

  graph_params(graph: string) {
    this.activeGraph = graph
  }


  onSelectAll($event) {

  }

  onItemSelect($event) {

  }

}
