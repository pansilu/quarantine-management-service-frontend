import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';

@Component({
  selector: 'app-station-distribution',
  templateUrl: './station-distribution.component.html',
  styleUrls: ['./station-distribution.component.scss']
})
export class StationDistributionComponent implements OnInit {

  dropdownSettings = {
    singleSelection: false,
    enableCheckAll: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  locations = new Array<NameIdModel>();
  selectedLocations = new Array<NameIdModel>();

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Moratuwa', 'Dehiwala', 'Kohuwala', 'Piliyandala', 'Kahathuduwa', 'Agulana'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Quarantine Persons' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
