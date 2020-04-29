import { Component, OnInit } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { QuarantinePersonEditModel } from '../../models/quarantine-person-edit.model';
import { ToastService } from 'src/app/Service/toast.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { AuthService } from 'src/app/Service/auth.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { AddressModel } from '../../models/address.model';
import QuarantineUserStatus from '../../models/QuarantineUserStatus';
import { UserStatusDetailModel } from '../../models/user-status-details.model';
import * as moment from 'moment';
import { StatusErrorModel } from '../../models/status-error.model';
import { NameIdLocationModel } from 'src/app/shared/models/name-id-location.model';
import { async } from '@angular/core/testing';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

declare var $: any
@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {

  /** **/
  today: string = moment().format('YYYY-MM-DD');
  status = QuarantineUserStatus;
  address: AddressModel = new AddressModel();
  person: QuarantinePersonEditModel = new QuarantinePersonEditModel();
  userStatusDetailModel: UserStatusDetailModel = new UserStatusDetailModel();
  currentStationName: string
  statusError: StatusErrorModel = new StatusErrorModel();
  quarantineCenters = new Array<NameIdLocationModel>()
  provices = new Array<NameIdModel>()
  districts = new Array<NameIdModel>()
  gnds = new Array<NameIdModel>()
  divisions = new Array<NameIdModel>()
  countries = new Array<NameIdModel>()
  hospitals = new Array<NameIdModel>()
  form: FormGroup;
  q_id: number;
  id: any;
  submitted: boolean;
  edit: boolean;
  gndId: number = 0;
  /** ***/



  saveButtonFlag: boolean
  // errGramaSewaDivision: boolean;
  // locationData: any
  // form2: FormGroup;

  // divisions = [];
  // policeStations = [];
  // gramaSewaDivisions = [];

  // officers = [];
  // officersToShow = [];
  // OFFICER_RANK_ENUM = ["All", "IGP", "SDIG", "DIG", "SSP", "SP", "ASP", "CI", "IP", "SI", "PSM", "PS", "PC"]
  // selectedRank: any
  // selectedOfficers = [];
  // selectedOfficerIds = [];
  // dropdownSettings = {};


  // addresses = [];
  // qp_exsistingAddressID: any;
  // qp_inspectorIds: []
  // q_person: any;
  // getOfficer: any;
  // officerRequestbody: any

  // appEnebleFlag: boolean

  // keyword = 'name';
  // addressKeyword = 'line';
  // createUser: boolean

  constructor(
    private _quarantineService: QuarantineService,
    private _toast: ToastService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _errorHandlerService: ErrorHandlerService,
  ) {
    // this.q_person = new QuarantinePersonEditModel()
  }

  // Parent case autocomp
  pCaseDropdownList = [];
  pCaseKeyword = 'caseNum';

  ngOnInit() {
    this.q_id = parseInt(this._route.snapshot.params['id'], 10);
    this.id = this.q_id
    this.getprovinces();
    this.getCountries();
    this.getHospitals();
    this.getquarantineCenters();
    this.edit = false

    // this.createUser = this._authService.loggedUser.createUser;
    // console.log(this.q_id)
    // this.officers = [];
    // this.officersToShow = [];
    // this.selectedOfficers = [];
    // this.appEnebleFlag = false;
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   enableCheckAll: false,
    //   idField: 'id',
    //   textField: 'showingName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };

    if (this.q_id > 0) {
      this.saveButtonFlag = false
      // this.person = new QuarantinePersonEditModel();
      this._quarantineService.getQPerson((d) => {
        // console.log(d)
        this.getDistrict(d.provinceId);
        this.getDivision(d.districtId);
        this.getGnd(d.divisionId);

        if (d.address != null) {
          this.address = d.address
        }
        this.person = d;
        this.createForm();

      },
        e => {
          this._errorHandlerService.Handler(e)
        }, this.q_id)
    } else {
      this.id = null;
      this.saveButtonFlag = true
      // this.person = new QuarantinePersonEditModel();
      this.createForm();
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  createForm() {
    const model = {
      // for address filteration
      province: new FormControl(this.person.provinceId, [Validators.required, Validators.min(1)]),
      district: new FormControl(this.person.districtId, [Validators.required, Validators.min(1)]),
      dsDivision: new FormControl(this.person.divisionId, [Validators.required, Validators.min(1)]),
      gndId: new FormControl(this.person.address.gndId, [Validators.required, Validators.min(1)]),
      // policeDivision: new FormControl(this.person.address.policeArea, [Validators.required, Validators.min(1)]),

      age: new FormControl(this.person.age),
      arrivalDate: new FormControl(this.person.arrivalDate),
      countryId: new FormControl(this.person.countryId),
      gender: new FormControl(this.person.gender),
      mobile: new FormControl(this.person.mobile, [Validators.pattern(/^0[0-9]{9}$/)]),
      name: new FormControl(this.person.name, Validators.required),
      nic: new FormControl(this.person.nic, [Validators.pattern(/^[0-9]{9}[vVxX]$/)]),
      passportNo: new FormControl(this.person.passportNo),
      phone: new FormControl(this.person.phone, [Validators.pattern(/^0[0-9]{9}$/)]),
    };
    this.form = this._formBuilder.group(model);
  }


  getPCases(search:string){
    this._quarantineService.getPCases((d) => {
      console.log(d)
      this.pCaseDropdownList = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    },search);
  }

  onChangeSearchPCase(search:string){
    this.getPCases(search);
  }

  selectEventPCase(event){
    this.userStatusDetailModel.parentCaseNum = event.caseNum
  }

  getCountries() {
    this._quarantineService.getCountries((d) => {
      this.countries = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    });
  }

  getprovinces() {
    this._quarantineService.getprovinces((d) => {
      this.provices = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    });
  }

  getHospitals() {
    this._quarantineService.getHospitals((d) => {
      this.hospitals = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    });
  }

  getquarantineCenters() {
    this._quarantineService.getQuarantineCenters(d => {
      this.quarantineCenters = d;
    }, e => {
      this._errorHandlerService.Handler(e)
    })
  }

  getDistrict(id: number) {
    this._quarantineService.getDistrict(d => {
      this.districts = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    }, id)
  }

  getDivision(id: number) {
    this._quarantineService.getDivision(d => {
      // console.log(d)
      this.divisions = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    }, id)
  }

  getGnd(id: number) {
    this._quarantineService.getGnd(d => {
      this.gnds = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    }, id)
  }

  onProvinceChange($event) {
    this.districts = new Array<NameIdModel>()
    this.divisions = new Array<NameIdModel>()
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getDistrict(id);
    this.form.controls.district.reset();
    this.form.controls.dsDivision.reset();
    this.form.controls.gndId.reset();
    this.address.gndId = null

  }

  onDistrictChange($event) {
    this.divisions = new Array<NameIdModel>()
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getDivision(id);

    this.form.controls.dsDivision.reset();
    this.form.controls.gndId.reset();
    this.address.gndId = null
  }

  onDsDivisionChange($event) {
    this.gnds = new Array<NameIdModel>()
    const id = $event.target.value;
    if (id != 'null')
      this.getGnd(id);
    this.form.controls.gndId.reset();
    this.address.gndId = null
  }

  onGndIdSelect($event) {
    const id = $event.target.value;
    this.gndId = id;
    this.address.gndId = id;
  }

  appEnabledValidation: boolean

  addNewPerson(exit: boolean = false) {
    this.submitted = true;
    var value = this.form.value;
    this.person.id = this.id
    this.person.age = value.age
    this.person.arrivalDate = value.arrivalDate
    this.person.countryId = value.countryId
    this.person.gender = value.gender
    this.person.mobile = value.mobile
    this.person.name = value.name
    this.person.nic = value.nic
    this.person.passportNo = value.passportNo
    this.person.phone = value.phone
    this.person.address = this.address

    /** 
     * Delete unnessesery property form
     * object
     */
    delete this.person.districtId;
    delete this.person.divisionId;
    delete this.person.provinceId;
    delete this.person.gndId;
    delete this.person.status;



    if (this.form.valid && this.person.userStatusDetails.length > 0) {
      this.setQuarantinePerson(exit)
    } else {
      if (this.person.userStatusDetails.length <= 0) {
        this._toast.error("Error", "there should be at least one status")
      }
      else {
        this._toast.error("Error", "Please Fill Required Fields")
      }
    }
  }

  validateAppFeatureEnable() {

  }

  setQuarantinePerson(exit: boolean = false) {
    // console.log(this.person)
    this._quarantineService.setQuarantinePerson((d) => {
      this._toast.success("Success", "Person saved");
      if (exit) {
        this._router.navigate(['quarantine/quarantine-person']);
      }
      else {
        this.resetForm();
      }
    }, e => {
      this._errorHandlerService.Handler(e)
    }, this.person);
  }

  resetForm() {
    this.form.reset()
    this.person = new QuarantinePersonEditModel();
    this.address = new AddressModel();
    this.gndId = 0;
    // clear dorpdown list
    this.districts = new Array<NameIdModel>()
    this.divisions = new Array<NameIdModel>()
    this.gnds = new Array<NameIdModel>()
  }

  onChangeSearchAddress(address: AddressModel) {
    // console.log(address);
    this.address = address;
  }

  new_officer: boolean
  new_center: boolean
  new_hospital: boolean

  add_new(type: string) {
    if (type === "center") {
      this.new_center = true;
      this.new_hospital = false;
    }
    if (type === "hospital") {
      this.new_hospital = true;
      this.new_center = false;
    }
    $('#myModal').modal('show');
  }

  close_add_new($event) {
    $('#myModal').modal('hide');
    if (this.new_center && $event) {
      this.getquarantineCenters();
      this.new_center = false
    }
    if (this.new_hospital && $event) {
      this.getHospitals();
      this.new_hospital = false
    }
  }

  onChangeStatus() {
    var model = new UserStatusDetailModel();
    model.type = this.userStatusDetailModel.type;
    this.userStatusDetailModel = model;
    this.statusError = new StatusErrorModel();
  }
  add_userStatus_detail() {
    this.statusError.type = this.validateString(this.userStatusDetailModel.type);
    this.statusError.startDate = this.validateString(this.userStatusDetailModel.startDate);
    this.statusError.endDate = this.validateString(this.userStatusDetailModel.endDate)
    this.statusError.qCenterId = this.validateNumber(this.userStatusDetailModel.qCenterId)
    // this.statusError.parentCaseNum = this.validateString(this.userStatusDetailModel.parentCaseNum);
    this.statusError.hospitalId = this.validateNumber(this.userStatusDetailModel.hospitalId);
    this.statusError.caseNum = this.validateString(this.userStatusDetailModel.caseNum);

    if (this.userStatusDetailModel.type === this.status.home) {
      if (this.statusError.startDate) {
        this._toast.error("Error", "Please fill the required fields")
        return
      }
    }

    if (this.userStatusDetailModel.type === this.status.positive) {
      if (this.statusError.startDate || this.statusError.hospitalId || this.statusError.parentCaseNum || this.statusError.caseNum) {
        this._toast.error("Error", "Please fill the required fields")
        return
      }
    }


    if (this.userStatusDetailModel.type === this.status.suspect) {
      if (this.statusError.startDate || this.statusError.hospitalId) {
        this._toast.error("Error", "Please fill the required fields")
        return
      }
    }

    if (this.userStatusDetailModel.type === this.status.remorte) {
      if (this.statusError.startDate || this.statusError.qCenterId) {
        this._toast.error("Error", "Please fill the required fields")
        return
      }
    }

    if (this.userStatusDetailModel.type === this.status.deceased) {
      if (this.statusError.endDate) {
        this._toast.error("Error", "Please fill the required fields")
        return
      }
    }
    this.person.userStatusDetails.push(this.userStatusDetailModel);
    var model = new UserStatusDetailModel();
    model.type = this.userStatusDetailModel.type;
    this.userStatusDetailModel = model;
    this.statusError = new StatusErrorModel();
  }


  validateString(prop): boolean {
    return prop === undefined || prop === null || prop == ""
  }

  validateNumber(prop: number): boolean {
    return (prop === undefined || prop === null);
  }

  gethostpitalName(id: number) {
    const name = this.hospitals.find(x => x.id == id)
    return (name ? name.name : "")
  }
  getQcenterName(id: number) {
    const name = this.quarantineCenters.find(x => x.id == id)
    return (name ? name.name : "")
  }

  deleteDetail(index: number) {
    if (this.person.userStatusDetails[index].id !== null) {
      this.person.userStatusDetails[index].delete = true;
    }
    else {
      this.person.userStatusDetails.splice(index, 1);
    }
  }
}


