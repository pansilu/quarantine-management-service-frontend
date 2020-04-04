import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';
import { DailyUpdatesViewModel } from '../../models/daily-updates-view.model';

@Component({
  selector: 'app-daily-updates',
  templateUrl: './daily-updates.component.html',
  styleUrls: ['./daily-updates.component.scss']
})
export class DailyUpdatesComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _quarantineService: QuarantineService, private _toast: ToastService) { }
  id:number
  updates:DailyUpdatesViewModel = new DailyUpdatesViewModel();
  ngOnInit() {
    this.id = parseInt(this._route.snapshot.params['id'], 10);
    this.getDailyUpdates()
  }

  getDailyUpdates(){
    this._quarantineService.getDailyUpdates(data=>{
      console.log(data)
      this.updates = data;
    },
    e=>{
      console.log(e);
      
    },this.id)
  }

}
