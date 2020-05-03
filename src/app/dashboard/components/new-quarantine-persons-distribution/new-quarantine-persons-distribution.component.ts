import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import GraphTypes from '../../models/GraphTypes';

@Component({
  selector: 'app-new-quarantine-persons-distribution',
  templateUrl: './new-quarantine-persons-distribution.component.html',
  styleUrls: ['./new-quarantine-persons-distribution.component.scss']
})
export class NewQuarantinePersonsDistributionComponent implements OnChanges {
  @Input('reqest') request_model !: GraphDataRequestModel
  request_clone: GraphDataRequestModel;
  loading: boolean = true;
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
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Value1', fill: false, borderColor: "#1967ab", pointBackgroundColor: "#1967bf" },
    { data: [], label: 'Value2', fill: false, borderColor: "#9f0419", pointBackgroundColor: "#9f042f" },
    { data: [], label: 'Value3', fill: false, borderColor: "#8e5ea2", pointBackgroundColor: "#8e5ebf" },
    { data: [], label: 'Value4', fill: false, borderColor: "#3ef8b8", pointBackgroundColor: "#3ef8cf" },
  ];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request_clone = JSON.parse(JSON.stringify(this.request_model));
      this.request_clone.graphType = GraphTypes.CUMULATIVE_COVID;
      this.request_clone.startDate = null;
      this.request_clone.endDate = null;
      this.request_clone.covidCaseType = null;
      this.populate();
    }

  }

  populate() {
    this.loading = true;
    this.barChartLabels = []
    this.barChartData[0].data = []
    this.barChartData[1].data = []
    this.barChartData[2].data = []
    this.barChartData[3].data = []

    this._dashboardService.getGraphData(d => {
      d.data.forEach((v) => {
        this.barChartLabels.push(v.key)
        this.barChartData[0].data.push(v.value1)
        this.barChartData[1].data.push(v.value2)
        this.barChartData[2].data.push(v.value3)
        this.barChartData[3].data.push(v.value4)
      })
      this.loading = false;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_clone)
  }


}
