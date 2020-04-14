import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnChanges {

  @Input('reqest') request_model !: GraphDataRequestModel

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20
      }
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      fill: false
    },
  ]

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  // ngOnInit() {
  // }

  populate() {
    this.pieChartLabels = []
    this.pieChartData[0].data = []
    var backgroundColor: string[] = []
    this._dashboardService.getGraphData(d => {
      const colorAvg = 1 / d.data.length
      d.data.forEach((v, i) => {
        this.pieChartLabels.push(v.key + ' (' + v.value + ')')
        this.pieChartData[0].data.push(v.value)
        backgroundColor.push(this.dynamicColors(colorAvg, (i + 1)))
      })
      this.pieChartData[0].backgroundColor = backgroundColor;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_model)
  }

  dynamicColors(avg: number, i: number): string {
    // return `rgba(255, 0, 0, ${avg * i})`;
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)//('#' + Math.floor(Math.random()*16777215).toString(16))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request_model.divisionIds = null
      this.request_model.graphType = "AGE"
      this.populate();
    }

  }

}
