import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';

@Component({
  selector: 'app-new-quarantine-persons-distribution',
  templateUrl: './new-quarantine-persons-distribution.component.html',
  styleUrls: ['./new-quarantine-persons-distribution.component.scss']
})
export class NewQuarantinePersonsDistributionComponent implements OnChanges {
  @Input('reqest') request_model !: GraphDataRequestModel
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
    { data: [], label: 'Quarantine Persons', fill: false, borderColor: "#1967ab", pointBackgroundColor: "#1967bf" },
  ];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request_model.graphType = "DATE"
      this.request_model.quserType = null
      this.request_model.divisionIds = null
      this.populate();
    }

  }

  populate() {
    this.loading = true;
    this.barChartLabels = []
    this.barChartData[0].data = []

    this._dashboardService.getGraphData(d => {
      d.data.forEach((v) => {
        this.barChartLabels.push(v.key)
        this.barChartData[0].data.push(v.value)
      })
      this.loading = false;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_model)
  }


}
