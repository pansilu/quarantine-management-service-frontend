import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-new-quarantine-persons-distribution',
  templateUrl: './new-quarantine-persons-distribution.component.html',
  styleUrls: ['./new-quarantine-persons-distribution.component.scss']
})
export class NewQuarantinePersonsDistributionComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Moratuwa', 'Dehiwala', 'Kohuwala', 'Piliyandala', 'Kahathuduwa', 'Agulana'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [8, 4, 6, 12, 25, 33], label: 'New Quarantine Persons',backgroundColor: "#8e5ea2" , hoverBackgroundColor:'#8e5ebf'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
