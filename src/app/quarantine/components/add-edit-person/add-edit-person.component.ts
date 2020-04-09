import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { QuarantinePersonEditModel } from '../../models/quarantine-person-edit.model';
import { ToastService } from 'src/app/Service/toast.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OfficerRequestModel } from '../../models/officer-request.model';
import { NameIdModel } from 'src/app/shared/models/name-id.model';
import { QuarantinePersonGetModel } from '../../models/quarantine-person-get.model';
declare var $: any
@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {
  // @Output() pageRefersh: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Input('id') q_id: number
  q_id: number;
  form: FormGroup;
  form2: FormGroup;
  person: QuarantinePersonEditModel;

  submitted: boolean;
  edit: boolean;

  errGramaSewaDivision: boolean;
  saveButtonFlag: boolean

  locationData: any

  divisions = [];
  policeStations = [];
  gramaSewaDivisions = [];

  officers = [];
  officersToShow = [];
  OFFICER_RANK_ENUM = ["All", "ASP", "SSP", "SARJANT", "PC", "IP", "Sp", "VIG"]
  selectedRank: any
  selectedOfficers = [];
  selectedOfficerIds = [];
  dropdownSettings = {};

  countries = [];
  hospitals = [];
  qp_inspectorIds: []

  id: any;
  q_person: any;
  getOfficer: any;
  officerRequestbody: any

  appEnebleFlag: boolean

  keyword = 'name';

  constructor(private _quarantineService: QuarantineService, private _toast: ToastService, private _formBuilder: FormBuilder, private _router: Router, private _route: ActivatedRoute) {
    this.q_person = new QuarantinePersonEditModel(),
      this.getOfficer = new OfficerRequestModel();
  }


  ngOnInit() {
    this.q_id = parseInt(this._route.snapshot.params['id'], 10);
    this.id = this.q_id
    this.getLocation();
    this.getCountries();
    this.getHospitals();
    // console.log(this.q_id)
    this.edit = false

    this.officers = [];
    this.officersToShow = [];

    this.selectedOfficers = [];

    this.appEnebleFlag = false;

    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    if (this.q_id > 0) {
      this.saveButtonFlag = false

      this._quarantineService.getQPerson((d) => {
        // console.log(d);
        this.person = d;
        // this.person.division = this.person.gramaSewaDivision.station.division.name
        // this.person.policeStation = this.person.gramaSewaDivision.station.id;
        // this.person.gramaSewaDivisionId = this.person.gramaSewaDivision.id;
        this.person.reportedDate = this.person.reportDate;

        if (this.person.stationResDto) {
          this.person.division = this.person.stationResDto.division.name
          this.person.stationId = this.person.stationResDto.id
        }

        if (this.person.arrivedCountry) {
          this.person.countryId = this.person.arrivedCountry.id
        }

        if (this.person.admitHos == null) {
          this.person.admitHos = new NameIdModel('', null)
        }

        if (this.person.confirmedHos == null) {
          this.person.confirmedHos = new NameIdModel('', null)
        }


        this.createForm();
        this.filterPoliceStation();
        // this.filterGramaSewaDivisions()
        this.selectedOfficers = d.inspectorDetails;
        this.getOfficer.ranks = null
        this.getOfficer.stationIds = [+this.person.stationResDto.id]
        this.getOfficerDetails()
      },
        e => {

        }, this.q_id)
      // get user form back end
    } else {
      this.id = null;
      this.saveButtonFlag = true
      this.person = new QuarantinePersonEditModel();
      this.createForm();
    }
    this.selectedRank = 'All'
  }

  mapModel() {
  }

  onItemSelect(item: any) {
    //  console.log(this.selectedOfficers)
  }

  onSelectAll(items: any) {

  }

  createForm() {
    const model = {
      qp_division: new FormControl(this.person.division),
      qp_policeStationId: new FormControl(this.person.stationId, [Validators.required, Validators.min(1)]),
      // qp_gramaSewaDivisionId: new FormControl(this.person.gramaSewaDivisionId, [Validators.required, Validators.min(1)]),
      qp_fileNo: new FormControl(this.person.fileNo),

      qp_nic: new FormControl(this.person.nic),
      qp_passportNo: new FormControl(this.person.passportNo),
      qp_name: new FormControl(this.person.name, Validators.required),
      qp_address: new FormControl(this.person.address.line, Validators.required),
      qp_age: new FormControl(this.person.age),
      qp_reportedDate: new FormControl(this.person.reportedDate, Validators.required),

      qp_mobile: new FormControl(this.person.mobile, [Validators.pattern(/^0[0-9]{9}$/)]),
      qp_phone: new FormControl(this.person.phone, [Validators.pattern(/^0[0-9]{9}$/)]),
      qp_appEnable: new FormControl(this.person.appEnable),

      qp_otherFacts: new FormControl(this.person.otherFacts),

      qp_arrivalDate: new FormControl(this.person.arrivalDate),
      qp_countryId: new FormControl(this.person.countryId),
      qp_informedDate: new FormControl(this.person.informedDate),
      qp_noticeDate: new FormControl(this.person.noticeAttachDate),

      // Officer Data handled seperately
    };
    this.form = this._formBuilder.group(model);

    const model2 = {
      qp_admittedDate: new FormControl(this.person.admittedDate),
      qp_admitHosId: new FormControl(this.person.admitHos.name),
      qp_dischargedDate: new FormControl(this.person.dischargedDate),

      qp_confirmedDate: new FormControl(this.person.confirmedDate),
      qp_confirmedHosId: new FormControl(this.person.confirmedHos.name),

      gr_name: new FormControl(this.person.guardianDetails.name),
      gr_nic: new FormControl(this.person.guardianDetails.nic),
      gr_passportNo: new FormControl(this.person.guardianDetails.passportNo),
      gr_mobile: new FormControl(this.person.guardianDetails.mobile),
    };
    this.form2 = this._formBuilder.group(model2)

    // this.form.get('qp_appEnable').disable();
  }

  getOfficerDetails() {
    this._quarantineService.getOfficerDetails((d) => {
      this.officers = d;
      this.officersToShow = d;
    }, e => {
      console.log(e);
    }, this.getOfficer);
  }

  rankSelected() {
    this.selectedOfficers = []
    if (this.selectedRank == 'All') {
      this.officersToShow = []
      this.officersToShow = this.officers
    } else {
      this.officersToShow = []
      this.officers.forEach(e => {
        if (e.rank == this.selectedRank) {
          this.officersToShow.push(e)
        }
      })
    }
  }


  getCountries() {
    this._quarantineService.getCountries((d) => {
      d.forEach(c => {
        this.countries.push(c);
      })
    }, e => {
      console.log(e);
    });
  }

  counrtySelected() {

  }

  getLocation() {
    this._quarantineService.getLocation((d) => {
      this.locationData = d;
      // console.log(d)
      this.filterDivision();
    }, e => {
      console.log(e);
    });
  }

  filterDivision() {
    this.locationData.forEach(element => {
      this.divisions.push(element.name)
    });
  }

  divisionSelected() {
    this.filterPoliceStation();
  }

  filterPoliceStation() {
    this.locationData.forEach(element => {
      if (element.name == this.form.value.qp_division) {
        const ps = element.stations
        ps.forEach(e => {
          this.policeStations.push(e)
        })
      }
    })
  }

  policeStationSelected() {
    this.getOfficer.ranks = null;
    const ps = [];
    ps.push(+this.form.value.qp_policeStationId)
    this.getOfficer.stationIds = ps
    this.getOfficerDetails()
    // this.filterGramaSewaDivisions()
  }

  // filterGramaSewaDivisions() {
  //   this.gramaSewaDivisions = []
  //   this.locationData.forEach(element => {
  //     const ps = element.stations
  //     ps.forEach(e => {
  //       if (e.id == this.form.value.qp_policeStationId) {
  //         const gsd = e.gramaSewaDivisions
  //         gsd.forEach(e => {
  //           this.gramaSewaDivisions.push(e)
  //         })
  //       }
  //     })

  //   })
  // }

  // gramaSewaDivisionSelected() {
  //   if (this.form.value.qp_gramaSewaDivisionId === undefined) {
  //     this.errGramaSewaDivision = true
  //   }
  // }

  getHospitals() {
    this._quarantineService.getHospitals((d) => {
      d.forEach(h => {
        this.hospitals.push(h);
      })
    }, e => {
      console.log(e);
    });
  }

  admitHosSelected() {
    //console.log(this.form2.value.qp_admitHosId)
  }

  confirmedHosSelected() {
    //console.log(this.form2.value.qp_confirmedHosId)
  }

  fillMobileNo() {
    // this.form.get('qp_appEnable').enable();
  }

  appEnabledValidation:boolean

  addNewPerson(exit: boolean = false) {
    this.submitted = true;

    this.selectedOfficers.forEach(e => {
      this.selectedOfficerIds.push(e.id)
    })

    if (this.form.valid) {
      // check mobile app feature is enabled and phone number is enterd
      if (this.form.value.qp_appEnable) {
        if (this.form.value.qp_mobile === null || this.form.value.qp_mobile === '') {
          this._toast.error('Error','To enable mobile app feature mobile number is requird')
          this.appEnabledValidation = true
          return;
        }
        this.appEnabledValidation = false
      }

      if(this.form.value.qp_mobile === ''){
        this.q_person.mobile = null;
      }
      else{
        this.q_person.mobile = this.form.value.qp_mobile
      }
      // ID use to seperate add or edit
      this.q_person.id = this.id
      this.q_person.stationId = +this.form.value.qp_policeStationId
      // this.q_person.gramaSewaDivisionId = +this.form.value.qp_gramaSewaDivisionId
      this.q_person.fileNo = this.form.value.qp_fileNo

      this.q_person.nic = this.form.value.qp_nic
      this.q_person.passportNo = this.form.value.qp_passportNo
      this.q_person.name = this.form.value.qp_name
      this.q_person.address = {
        id: null,
        line: this.form.value.qp_address
      }
      this.q_person.age = this.form.value.qp_age
      this.q_person.reportDate = this.form.value.qp_reportedDate

      this.q_person.appEnable = this.form.value.qp_appEnable

      this.q_person.phone = this.form.value.qp_phone

      this.q_person.otherFacts = this.form.value.qp_otherFacts

      this.q_person.arrivalDate = this.form.value.qp_arrivalDate
      this.q_person.countryId = this.form.value.qp_countryId
      this.q_person.informedDate = this.form.value.qp_informedDate
      this.q_person.noticeAttachDate = this.form.value.qp_noticeDate

      this.q_person.inspectorIds = this.selectedOfficerIds

      this.q_person.admittedDate = this.form2.value.qp_admittedDate
      // this.q_person.admitHosId = this.form2.value.qp_admitHosId
      this.q_person.dischargedDate = this.form2.value.qp_dischargedDate

      this.q_person.confirmedDate = this.form2.value.qp_confirmedDate
      // this.q_person.confirmedHosId = this.form2.value.qp_confirmedHosId

      this.q_person.guardianDetails = {
        id: null,
        //name
        mobile: this.form2.value.gr_mobile,
        nic: this.form2.value.gr_nic,
        passportNo: this.form2.value.gr_passportNo
      }

      if (this.person.confirmedHos.name === '' && this.person.confirmedHos.id === null) {
        this.q_person.confirmedHos = null
      }
      else {
        this.q_person.confirmedHos = this.person.confirmedHos
      }

      if (this.person.confirmedHos.name === '' && this.person.confirmedHos.id === null) {
        this.q_person.admitHos = null
      }
      else {
        this.q_person.admitHos = this.person.admitHos
      }

      this.q_person.secret = "hi"

      // console.log(this.q_person)
      // console.log(this.q_person)
      this.setQuarantinePerson(exit)

    } else {
      this._toast.error("Error", "Please Fill Required Fields")
    }
  }

  validateAppFeatureEnable() {

  }

  setQuarantinePerson(exit: boolean = false) {
    this._quarantineService.setQuarantinePerson((d) => {
      this._toast.success("Success", "Person saved");
      if (exit) {
        this._router.navigate(['quarantine/quarantine-person']);
      }
      else {
        this.resetForm();
      }
    }, e => {
      // this._toast.error("Error", "Canot Save user please recheck your data")
      this._toast.error("Error", e.error.errorDesc)
      // console.log(e);
    }, this.q_person);
  }

  resetForm() {
    this.form.reset()
    this.form2.reset()
    this.selectedOfficers = [];
    this.selectedRank = null
    this.officersToShow = []
  }

  selectEvent(item) {
    // do something with selected item
    this.person.confirmedHos = item;
    // console.log(item)
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    var value = new NameIdModel(search, null);
    this.person.confirmedHos = value
    // console.log(value);
  }

  onFocused(e) {
    // do something
  }

  selectEventAd(item) {
    // do something with selected item
    this.person.admitHos = item;
    // console.log(item)
  }

  onChangeSearchAd(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    var value = new NameIdModel(search, null);
    this.person.admitHos = value
    // console.log(value);
  }

  onFocusedAd(e) {
    // do something
  }

  new_officer:boolean
  add_new() {
    $('#myModal').modal('show');
    this.new_officer = true;
    // document.getElementById('new_person').style.visibility = 'visible';
    // document.getElementById('new_person').style.opacity = '1';
  }

  close_add_new($event) {
    $('#myModal').modal('hide');
    this.new_officer = false;
    this.getOfficerDetails()
    // document.getElementById('new_person').style.visibility = 'hidden';
    // document.getElementById('new_person').style.opacity = '0';
  }

}


