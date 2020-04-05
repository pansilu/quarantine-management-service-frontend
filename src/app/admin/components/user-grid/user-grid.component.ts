import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/Service/toast.service';
import { UserViewModel } from 'src/app/quarantine/models/user-view.model';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  users: Array<UserViewModel>
  count = 30;
  offset = 0;
  limit = 10;
  search_text = ""
  pageNumber = 0
  sort: string = ''
  constructor(private _quarantineService: QuarantineService,private _toast: ToastService, private _router :Router) { }

  ngOnInit() {
    this.load_data_types();
  }

  onPageChange(offset) {
    this.offset = offset;
    this.pageNumber = Math.floor(offset / this.limit);
    this.load_data_types();
  }

  load_data_types() {
    const pageSize = this.limit;
    this._quarantineService.getUsers((d) => {
      this.users = d.data;
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

  edit(id:number){
    this._router.navigate(['admin/user', id]);
  }


}
