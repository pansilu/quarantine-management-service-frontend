import { Component, OnInit } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.scss']
})
export class PersonGridComponent implements OnInit {
  show_q_person_model:boolean = false;
  q_person_id:number = 0;
  count = 30;
  offset = 0;
  limit = 10;
  search_text = ""
  constructor(private _quarantineService: QuarantineService,private _toast: ToastService) { }

  ngOnInit() {
    this.load_data_types();
  }

  onPageChange(offset) {
    this.offset = offset;
    this.load_data_types();
  }

  load_data_types() {
    const pageSize = this.limit;
    this._quarantineService.getDatatypes((d) => {
      console.log(d);
      this.count = d.total;
    }, e => {
      console.log(e);
    }, this.offset, pageSize, this.search_text); 
  }

  search() {
    this._toast.error("Error","Search")
    this.offset = 0;
    this.load_data_types();
  }

  checkEnter(key: number) {
    if (key === 13) {
      this.search();
    }
  }


  add_new(id:number) {
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

}
