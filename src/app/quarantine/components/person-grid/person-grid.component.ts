import { Component, OnInit } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';
import { Router } from '@angular/router';
import { QuarantinePersonViewModel } from '../../models/quarantine-person-view.model';
import { AddressModel } from '../../models/address.model';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

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
  sort: string = 'id,desc'
  status: string = "";
  constructor(private _quarantineService: QuarantineService, private _toast: ToastService, public _router: Router, private _errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.getQUsers();
  }

  onPageChange(offset) {
    // console.log(offset)
    this.offset = offset;
    this.pageNumber = Math.floor(offset / this.limit);
    this.getQUsers();
  }

  getQUsers() {
    const pageSize = this.limit;
    this._quarantineService.getQUsers((d) => {
      this.persons = d.data;
      this.count = d.totalPages * pageSize;
    }, e => {
      this._errorHandlerService.Handler(e);
    }, pageSize, this.pageNumber, this.sort, this.search_text, this.status);
  }

  onPageRefresh(value: boolean) {
    this.getQUsers();
  }

  search() {
    this.offset = 0;
    this.getQUsers();
  }

  checkEnter(key: number) {
    if (key === 13) {
      this.search();
    }
  }

  onStatusChange($event) {
    this.status = $event.target.value;
    this.getQUsers();
  }

  OnEditClick(id: number) {
    this._router.navigate(['quarantine/add-edit', id]);
  }

  validateString(prop): boolean {
    return prop === undefined || prop === null || prop == ""
  }

}
