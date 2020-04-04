import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { QuarantinePersonEditModel } from '../../models/quarantine-person-edit.model';
import { ToastService } from 'src/app/Service/toast.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OfficerRequestModel } from '../../models/officer-request.model';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {
  @Output() pageRefersh: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('id') q_id:number 
  form: FormGroup;
  form2: FormGroup;
  person: QuarantinePersonEditModel;

  submitted: boolean;
  edit: boolean;

  errGramaSewaDivision: boolean;

  locationData: any

  divisions = [];
  policeStations = [];
  gramaSewaDivisions = [];

  officers = [];
  officersToShow= [];
  OFFICER_RANK_ENUM = ["All", "ASP", "SSP", "SARJANT", "PC", "IP", "Sp", "VIG"]
  selectedRank:any
  selectedOfficers = [];
  selectedOfficerIds = [];
  dropdownSettings = {};

  countries = [];
  hospitals = [];
  qp_inspectorIds: []

  id: any;
  q_person: any;
  getOfficer: any;
  officerRequestbody:any

  constructor(private _quarantineService: QuarantineService, private _toast: ToastService, private _formBuilder: FormBuilder, private _router: Router) {
    this.q_person = new QuarantinePersonEditModel(),
    this.getOfficer = new OfficerRequestModel();
  }


  ngOnInit() {

    console.log(this.q_id)
    this.edit = false

    this.officers = [];
    this.officersToShow = [];

    this.selectedOfficers = [];

    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll:false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.getCountries();
    this.getLocation();
    this.getHospitals();

    if (this.edit) {
      this.id = 10
      // get user form back end
    } else {
      this.id = null;
      this.person = new QuarantinePersonEditModel();
      this.createForm();
    }

    this.createForm();

  }

  onItemSelect(item: any) {
  //  console.log(this.selectedOfficers)
  }

  onSelectAll(items: any) {
    
  }

  createForm() {
    const model = {
      qp_division: new FormControl(this.person.division),
      qp_policeStationId: new FormControl(this.person.policeStation),
      qp_gramaSewaDivisionId: new FormControl(this.person.gramaSewaDivisionId),
      qp_fileNo: new FormControl(this.person.fileNo),

      qp_nic: new FormControl(this.person.nic),
      qp_passportNo: new FormControl(this.person.passportNo),
      qp_name: new FormControl(this.person.name),
      qp_address: new FormControl(this.person.address.line),
      qp_age: new FormControl(this.person.age),
      qp_reportedDate: new FormControl(this.person.reportedDate, Validators.required),

      qp_mobile: new FormControl(this.person.mobile),
      qp_phone: new FormControl(this.person.phone),
      qp_appEnable: new FormControl(this.person.appEnable),

      qp_otherFacts: new FormControl(this.person.otherFacts),

      qp_arrivalDate: new FormControl(this.person.arrivalDate),
      qp_countryId: new FormControl(this.person.countryId),
      qp_informedDate: new FormControl(this.person.informedDate),
      qp_noticeDate:  new FormControl(this.person.informedDate),

      // Officer Data handled seperately
    };
    this.form = this._formBuilder.group(model);

    const model2 = {
      qp_admittedDate: new FormControl(this.person.admittedDate),
      qp_admitHosId: new FormControl(this.person.admitHosId),
      qp_dischargedDate: new FormControl(this.person.dischargedDate),

      qp_confirmedDate: new FormControl(this.person.confirmedDate),
      qp_confirmedHosId: new FormControl(this.person.confirmedHosId),

      gr_name: new FormControl(this.person.guardianDetails.name),
      gr_nic: new FormControl(this.person.guardianDetails.nic),
      gr_passportNo: new FormControl(this.person.guardianDetails.passportNo),
      gr_mobile: new FormControl(this.person.guardianDetails.mobile),
    };
    this.form2 = this._formBuilder.group(model2)

  }

  getOfficerDetails(){
    console.log(this.getOfficer)
    this._quarantineService.getOfficerDetails((d) => {
      console.log(d)
      this.officers = d
    }, e => {
      console.log(this.officers);
    },this.getOfficer);
  }

  rankSelected(){
    this.selectedOfficers = []
    if(this.selectedRank == 'All'){
      this.officersToShow = []
      this.officersToShow = this.officers
    }else{
    this.officersToShow = []
    this.officers.forEach(e=>{
      if(e.rank == this.selectedRank){
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
    this.filterGramaSewaDivisions()
  }

  filterGramaSewaDivisions() {
    this.gramaSewaDivisions = []
    this.locationData.forEach(element => {
      const ps = element.stations
      ps.forEach(e => {
        if (e.name == this.form.value.qp_policeStation) {
          const gsd = e.gramaSewaDivisions
          gsd.forEach(e => {
            this.gramaSewaDivisions.push(e)
          })
        }
      })

    })
  }

  gramaSewaDivisionSelected() {
    if (this.form.value.gramaSewaDivisionId == NaN) {
      this.errGramaSewaDivision = true
    }
  }

  getHospitals(){
    this._quarantineService.getHospitals((d) => {
      d.forEach(h => {
        this.hospitals.push(h);
      })
    }, e => {
      console.log(e);
    });
  }

  admitHosSelected(){
    //console.log(this.form2.value.qp_admitHosId)
  }

  confirmedHosSelected(){
    //console.log(this.form2.value.qp_confirmedHosId)
  }

  addNewPerson() {
    this.submitted = true;

    this.selectedOfficers.forEach(e=>{
      this.selectedOfficerIds.push(e.id)
    })

    if (this.form.valid) {

      // ID use to seperate add or edit
      this.q_person.id = this.id

      this.q_person.gramaSewaDivisionId = +this.form.value.qp_gramaSewaDivisionId
      this.q_person.fileNo = this.form.value.qp_fileNo

      this.q_person.nic = this.form.value.qp_nic
      this.q_person.passportNo = this.form.value.qp_passportNo
      this.q_person.name = this.form.value.qp_name
      this.q_person.address = {
        id: null,
        line: this.form.value.qp_address
      }
      this.q_person.age = this.form.value.mainForm
      this.q_person.reportDate = this.form.value.qp_reportedDate

      this.q_person.mobile = this.form.value.qp_mobile
      this.q_person.phone = this.form.value.qp_phone
      this.q_person.appEnable = this.form.value.qp_appEnable

      this.q_person.otherFacts = this.form.value.qp_otherFacts

      this.q_person.arrivalDate = this.form.value.qp_arrivalDate
      this.q_person.countryId = this.form.value.qp_countryId
      this.q_person.informedDate = this.form.value.qp_informedDate
      //this.q_person. = this.form.value.qp_noticeDate

      this.q_person.inspectorIds = this.selectedOfficerIds

      this.q_person.admittedDate = this.form2.value.qp_admittedDate
      this.q_person.admitHosId = this.form2.value.qp_admitHosId
      this.q_person.dischargedDate = this.form2.value.qp_dischargedDate

      this.q_person.confirmedDate = this.form2.value.qp_confirmedDate
      this.q_person.confirmedHosId = this.form2.value.qp_confirmedHosId

      this.q_person.guardianDetails = {
        id: null,
        //name
        mobile: this.form2.value.gr_mobile,
        nic: this.form2.value.gr_nic,
        passportNo: this.form2.value.gr_passportNo
      }

      this.q_person.secret = "hi"

      console.log(this.q_person)
      this.setQuarantinePerson()

    } else {
      this._toast.error("Error", "Please Fill Required Fields")
    }
  }

  setQuarantinePerson() {
    this._quarantineService.setQuarantinePerson((d) => {
      console.log(d);
      this.pageRefersh.emit(true);
      this._toast.success("Success", "Person saved");
      this.close_add_new();
    }, e => {
      console.log(e);
    }, this.q_person);

    this.resetForm();
  }

  close_add_new() {
    document.getElementById('addNew').style.visibility = 'hidden';
    document.getElementById('addNew').style.opacity = '0';
    this.resetForm();
  }

  resetForm() {
    this.form.reset()
    this.form2.reset()
    this.selectedOfficers = [];
    this.selectedRank = null
    this.officersToShow = []
  }

}
