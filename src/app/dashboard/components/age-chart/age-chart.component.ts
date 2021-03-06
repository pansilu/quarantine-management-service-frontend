import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import GraphTypes from '../../models/GraphTypes';


@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnChanges {

  @Input('reqest') request_model !: GraphDataRequestModel
  request_clone: GraphDataRequestModel;

  loading: boolean = true;
  data: boolean = false;
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
      backgroundColor: ["#1476f2", "#c4a92c", "#213a51", "#660bcf", "#2df73a", "#c3a0f9", "#932332"],
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
    this.loading = true;
    this.pieChartLabels = []
    this.pieChartData[0].data = []
    var total = 0;
    this._dashboardService.getGraphData(d => {
      const colorAvg = 1 / d.data.length
      d.data.forEach((v, i) => {
        total = total + v.value
        this.pieChartLabels.push(v.key + ' (' + v.value + ')')
        this.pieChartData[0].data.push(v.value)
        // backgroundColor.push(this.dynamicColors(colorAvg, (i + 1)))
      })      
      
      if (total > 0) {
        this.data = true
      }
      else {
        this.data = false
      }
      // this.pieChartData[0].backgroundColor = backgroundColor;
      this.loading = false;

    },
      e => {
        this._errorHandlerService.Handler(e);
      }, this.request_clone)
  }

  dynamicColors(avg: number, i: number): string {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)//('#' + Math.floor(Math.random()*16777215).toString(16))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request_clone = JSON.parse(JSON.stringify(this.request_model));
      this.request_clone.graphType = GraphTypes.age
      this.request_clone.endDate = null
      this.request_clone.startDate = null
      this.populate();
    }

  }

}
