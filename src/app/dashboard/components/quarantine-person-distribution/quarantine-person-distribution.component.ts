import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NameIdModel } from 'src/app/shared/models/name-id.model';

@Component({
  selector: 'app-quarantine-person-distribution',
  templateUrl: './quarantine-person-distribution.component.html',
  styleUrls: ['./quarantine-person-distribution.component.scss']
})
export class QuarantinePersonDistributionComponent implements OnInit {

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
  barChartLabels: Label[] = ['2020-04-01', '2020-04-02', '2020-04-03', '2020-04-04', '2020-04-05', '2020-04-06'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2, 5, 6, 8, 11, 17], label: 'Quarantine Persons', fill: false, borderColor: "#3e95cd", },
    { data: [0, 1, 3, 3, 5, 7], label: 'Persons End Quarantine', fill: false, borderColor: "#8e5ea2",}

  ];
  constructor() { }

  ngOnInit() {
  }

}
