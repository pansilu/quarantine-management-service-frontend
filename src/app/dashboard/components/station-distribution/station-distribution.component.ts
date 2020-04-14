import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';

@Component({
  selector: 'app-station-distribution',
  templateUrl: './station-distribution.component.html',
  styleUrls: ['./station-distribution.component.scss']
})
export class StationDistributionComponent implements OnChanges {

  @Input('reqest') request_model !: GraphDataRequestModel

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Quarantine Persons', backgroundColor: "#3e95cd", hoverBackgroundColor: '#3e95ef' },
  ];

  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request_model.graphType = "STATION"
      this.request_model.divisionIds = null;
      this.populate();
    }

  }

  populate() {
    this.barChartLabels = []
    this.barChartData[0].data = []
    this._dashboardService.getGraphData(d => {
      d.data.forEach((v) => {
        this.barChartLabels.push(v.key)
        this.barChartData[0].data.push(v.value)
      })
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_model)
  }

}
