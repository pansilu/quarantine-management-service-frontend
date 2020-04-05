import { Component, OnInit } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';
import { Router } from '@angular/router';
import { QuarantinePersonViewModel } from '../../models/quarantine-person-view.model';

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.scss']
})
export class PersonGridComponent implements OnInit {
  totalPages: number
  persons: Array<QuarantinePersonViewModel>
  show_q_person_model: boolean = false;
  q_person_id: number = 0;
  count = 30;
  offset = 0;
  limit = 10;
  pageNumber = 0
  search_text = ""
  sort: string = ''
  constructor(private _quarantineService: QuarantineService, private _toast: ToastService, public _router: Router) { }

  ngOnInit() {
    this.load_data_types();
  }

  onPageChange(offset) {
    console.log(offset)
    this.offset = offset;
    this.pageNumber = Math.floor(offset / this.limit);
    this.load_data_types();
  }

  load_data_types() {
    const pageSize = this.limit;
    this._quarantineService.getQUsers((d) => {
      this.persons = d.data;
      this.count = d.totalPages * pageSize;
    }, e => {
      this._toast.error("Error","Canot get quarantine users")
      // console.log(e);
    }, pageSize, this.pageNumber, this.sort);
  }

  onPageRefresh(value: boolean) {
    this.load_data_types();
  }

  search() {
    this.offset = 0;
    this.load_data_types();
  }

  checkEnter(key: number) {
    if (key === 13) {
      this.search();
    }
  }


  add_new(id: number) {
    this.q_person_id = id;
    this.show_q_person_model = true;
    document.getElementById('addNew').style.visibility = 'visible';
    document.getElementById('addNew').style.opacity = '1';
  }

  close_add_new() {
    this.show_q_person_model = false;
    document.getElementById('addNew').style.visibility = 'hidden';
    document.getElementById('addNew').style.opacity = '0';
  }

  OnDailyUpdatesClick(id: number) {
    this._router.navigate(['quarantine/dailyUpdates', id]);
  }

}
