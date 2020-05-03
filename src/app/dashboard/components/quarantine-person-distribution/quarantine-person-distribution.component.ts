import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import GraphTypes from '../../models/GraphTypes';


@Component({
  selector: 'app-quarantine-person-distribution',
  templateUrl: './quarantine-person-distribution.component.html',
  styleUrls: ['./quarantine-person-distribution.component.scss']
})
export class QuarantinePersonDistributionComponent implements OnChanges {

  @Input('reqest') request_model !: GraphDataRequestModel
  request_clone: GraphDataRequestModel;
  loading: boolean = true;
  haveDistrict:boolean = false; 
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          callback: function (tick, index, array) {
            return (index % 3) ? "" : tick;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value: number) { if (value % 1 === 0) { return value; } }
        }
      }]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Quarantine Persons', fill: false, borderColor: "#3e95cd", pointBackgroundColor: '#3e95df' },
    { data: [], label: 'Persons End Quarantine', fill: false, borderColor: "#8e5ea2", pointBackgroundColor: '#8e5ebf' }

  ];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {

    if (this.request_model) {
      this.request_clone = JSON.parse(JSON.stringify(this.request_model));
      this.request_clone.graphType = GraphTypes.DISTRICT_COMPARISION;
      this.request_clone.endDate = null
      this.request_clone.startDate = null
      this.request_clone.provinceId = null
      this.request_clone.districtId = null
      this.request_clone.gndId = null
      this.request_clone.divisionId = null
      if (this.request_clone.districtIdList !== null && this.request_clone.districtIdList.length > 0) {
        this.barChartType = this.request_clone.districtIdList.length > 4 ? 'line' : 'bar'
        this.haveDistrict = true;
        this.populate();
      }
      else{
        this.loading = false;
        this.haveDistrict = false;
      }
    }
  }

  populate() {
    this.loading = true;
    this.barChartData = [];
    this._dashboardService.getGraphData(d => {
      this.barChartLabels = d.keys;
      if (this.barChartType == 'line') {

        d.dataSet.forEach(e => {
          e.fill = false;
          this.barChartData.push(e)
        });
      }
      else {
        this.barChartData = d.dataSet;
      }
      this.loading = false;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_clone)
  }

}
