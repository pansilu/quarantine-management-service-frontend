import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-updates',
  templateUrl: './daily-updates.component.html',
  styleUrls: ['./daily-updates.component.scss']
})
export class DailyUpdatesComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }
  id:number
  ngOnInit() {
    this.id = parseInt(this._route.snapshot.params['id'], 10);
    console.log(this.id)
  }

}
