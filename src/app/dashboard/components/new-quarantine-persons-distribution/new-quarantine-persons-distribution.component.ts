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

  // barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // barChartLabels: Label[] = ['Moratuwa', 'Dehiwala', 'Kohuwala', 'Piliyandala', 'Kahathuduwa', 'Agulana'];
  // barChartType: ChartType = 'bar';
  // barChartLegend = true;
  // barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [8, 4, 6, 12, 25, 33], label: 'New Quarantine Persons',backgroundColor: "#8e5ea2" , hoverBackgroundColor:'#8e5ebf'}
  // ];

  // constructor() { }

  // ngOnInit() {
  // }

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
    { data: [], label: 'Quarantine Persons', fill: false, borderColor: "#1967ab",pointBackgroundColor:"#1967bf" },
  ];
  constructor(private _dashboardService: DashboardService, private _errorHandlerService: ErrorHandlerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.request_model){
      this.request_model.graphType = "DATE"
      this.request_model.divisionIds = null
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
