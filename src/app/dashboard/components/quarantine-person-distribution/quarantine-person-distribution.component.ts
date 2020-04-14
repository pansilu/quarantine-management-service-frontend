import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-quarantine-person-distribution',
  templateUrl: './quarantine-person-distribution.component.html',
  styleUrls: ['./quarantine-person-distribution.component.scss']
})
export class QuarantinePersonDistributionComponent implements OnChanges {

  @Input('reqest') request_model !: GraphDataRequestModel

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          callback: function (tick, index, array) {
            return (index % 3) ? "" : tick;
          }
        }
      }]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Quarantine Persons', fill: false, borderColor: "#3e95cd", pointBackgroundColor: '#3e95df' },
    { data: [], label: 'Persons End Quarantine', fill: false, borderColor: "#8e5ea2", pointBackgroundColor: '#8e5ebf' }

  ];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {

    if (this.request_model) {
      this.request_model.graphType = "GROWTH"
      this.request_model.endDate = null
      this.request_model.startDate = null
      this.populate();
    }
  }

  populate() {
    this.barChartLabels = []
    this.barChartData[0].data = []
    this.barChartData[1].data = []

    this._dashboardService.getGraphData(d => {
      d.data.forEach((v) => {
        this.barChartLabels.push(v.key)
        this.barChartData[0].data.push(v.value1)
        this.barChartData[1].data.push(v.value2)

      })
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_model)
  }

}
