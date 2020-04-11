import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-station-distribution',
  templateUrl: './station-distribution.component.html',
  styleUrls: ['./station-distribution.component.scss']
})
export class StationDistributionComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Moratuwa', 'Dehiwala', 'Kohuwala', 'Piliyandala', 'Kahathuduwa', 'Agulana'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Quarantine Persons',backgroundColor: "#3e95cd" , hoverBackgroundColor:'#3e95ef' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
