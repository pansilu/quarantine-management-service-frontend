import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../admin/models/user.model';
import { UserService } from 'src/app/Service/user.service';
import { LocationModel } from '../../../admin/models/location.model';
import { ToastService } from 'src/app/Service/toast.service';
import { NameIdModel } from 'src/app/shared/models/name-id.model';

@Component({
  selector: 'app-new-officer',
  templateUrl: './new-officer.component.html',
  styleUrls: ['./new-officer.component.scss']
})
export class NewOfficerComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private _formBuilder: FormBuilder, private _userService: UserService, private _toast: ToastService) { }
  edit: boolean;
  form: FormGroup;
  user: UserModel;
  submitted: boolean
  @Output('save') save: EventEmitter<boolean> = new EventEmitter<boolean>();


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

  locations: Array<NameIdModel>;
  selectedLocations = new Array<NameIdModel>();

  ngOnInit() {
    this.user = new UserModel();
    this.createForm();
    this.getLocations();
    this.locations = new Array<LocationModel>();
    //this.getLocations()
  }

  createForm() {
    const model = {
      // role: new FormControl(this.user.role, Validators.required),
      name: new FormControl(this.user.name, Validators.required),
      mobile: new FormControl(this.user.mobile, Validators.required),
      canCreateUser: new FormControl(this.user.canCreateUser, Validators.required),
      nic: new FormControl(this.user.nic),
      officeId: new FormControl(this.user.officeId, Validators.required),
      passportNo: new FormControl(this.user.passportNo),
      // phone: new FormControl(this.user.phone),
      rank: new FormControl(this.user.rank)
    };
    this.form = this._formBuilder.group(model);
  }

  getLocations() {
    this._userService.getLocations(d => {
      this.locations = d[0].stations
    }, e => {
      this._toast.error("Error", "Get Location Failed")
      //console.log(e);
    })
  }

  addUserLocation(event) {
    if (event.target.value > 0 && this.user.stationIdList.indexOf(event.target.value) == -1) {
      this.user.stationIdList.push(+event.target.value)
    }
  }

  submit() {
    this.submitted = true;
    if (this.form.valid && this.selectedLocations.length > 0) {
      this.setLocationArray();
      const value = this.form.value
      value.id = this.user.id;
      value.stationIdList = this.user.stationIdList;
      this._userService.addUser((data) => {
        this.save.emit(true);
        this._toast.success("Success", "User saved")
      }, (e) => {
        console.log(e.status)
        this._toast.error("Error", e.status + " " + e.error.errorDesc)
      }, value);
    }
    else {
      if (this.selectedLocations.length <= 0) {
        this._toast.error("Error", "Need to select at least one police station")
      }
    }
  }

  setLocationArray() {
    this.user.stationIdList = new Array<number>();
    this.selectedLocations.forEach(e => {
      this.user.stationIdList.push(e.id);
    })
  }

  onItemSelect($event) {
    // console.log($event)
  }

  onSelectAll($event) {
    // console.log($event)
  }

}
