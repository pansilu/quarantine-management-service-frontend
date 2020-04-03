import { Component, OnInit } from '@angular/core';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { QuarantinePersonEditModel } from '../../models/quarantine-person-edit.model';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {

  isSuspected: boolean;
  isInfected: boolean;

  locationData: any
  divisions = [];
  policeStations = [];
  gramaSewaDivisions = [];
  gsd = []

  countries = [];
  countrynames = []

  q_person: any;

  qp_division: string
  qp_policeStation: string
  qp_gramaSewaDivisionName: string
  qp_gramaSewaDivisionId: number
  qp_fileNo: string

  qp_nic: string
  qp_passportNo: string
  qp_name: string
  qp_address: string
  qp_age: number
  qp_reportedDate: string
  qp_mobile: string
  qp_phone: string
  qp_appEnable: boolean

  qp_otherInfo: string

  qp_arrivalDate: string
  qp_countryName: string
  qp_countryId: string
  qp_informedDate: string

  qp_inspectorIds: []

  gr_name: string
  gr_mobile: string
  gr_nic: string
  gr_passportNo: string


  constructor(private _quarantineService: QuarantineService) {
    this.q_person = new QuarantinePersonEditModel()
  }


  ngOnInit() {
    this.isSuspected = false;
    this.isInfected = false;
    this.getCountries();
    this.getLocation();

    // Hardcode values for testing 

    /* this.q_person.address = {id:null, line:"ABDERd"}
     this.q_person.age = 45
     this.q_person.appEnable = true
     this.q_person.id = null
     this.q_person.countryId = 12458
     this.q_person.fileNo = "ASD123"
     this.q_person.gramaSewaDivisionId = 123
     this.q_person.guardianDetails = null
     this.q_person.informedDate = "2020-02-12"
     this.q_person.inspectorIds = null
     this.q_person.name = "nimal"
     this.q_person.mobile = "0174456989"
     this.q_person.phone = "0.21452687"
     this.q_person.reportedDate = null
     this.q_person.nic = "123456788v"
     this.q_person.passportNo = "NB1234Q234"
     this.q_person.secret = "hi"
 
     console.log(this.q_person)
     this.setQuarantinePerson()*/

  }

  getCountries() {
    this._quarantineService.getCountries((d) => {
      d.forEach(c => {
        this.countries.push(c);
        this.countrynames.push(c.name);
      })
    }, e => {
      console.log(e);
    });
  }

  counrtySelected() {
    this.countries.forEach(e => {
      if (e.name == this.qp_countryName) {
        this.qp_countryId = e.id
      }
    })
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
      if (element.name == this.qp_division) {
        const ps = element.stations
        ps.forEach(e => {
          this.policeStations.push(e.name)
        })
      }
    })
  }

  policeStationSelected() {
    this.filterGramaSewaDivisions()
  }

  filterGramaSewaDivisions() {
    this.gramaSewaDivisions = []
    this.locationData.forEach(element => {
      const ps = element.stations
      ps.forEach(e => {
        if (e.name == this.qp_policeStation) {
          this.gsd = e.gramaSewaDivisions
          this.gsd.forEach(e => {
            this.gramaSewaDivisions.push(e.name)
          })
        }
      })

    })
  }

  gramaSewaDivisionSelected() {
    this.gsd.forEach(e => {
      if (e.name == this.qp_gramaSewaDivisionName) {
        this.qp_gramaSewaDivisionId = e.id
      }
    })
  }

  setQuarantinePerson() {
    this._quarantineService.setQuarantinePerson((d) => {
      console.log(d);
    }, e => {
      console.log(e);
    }, this.q_person);

    this.resetForm();
  }

  checkIfSuspected(event) {
    if (event.target.checked) {
      this.isSuspected = true;
    } else {
      this.isSuspected = false;
    }
  }

  checkIfInfected(event) {
    if (event.target.checked) {
      this.isInfected = true;
    } else {
      this.isInfected = false;
    }
  }

  //functions for validation purpose - not yet implement

  /*fillFileNo(qp_fileNo) {
    this.qp_fileNo = qp_fileNo
  }

  fillQPNIC(qp_nic) {
    this.qp_nic = qp_nic
  }

  fillQPPasspoerNo(qp_passportNo) {
    this.qp_passportNo = qp_passportNo
  }

  fiiQPName(qp_name) {
    this.qp_name = qp_name
  }

  fillQPAddres(qp_address) {
    this.qp_address = qp_address
  }

  fillQPAge(qp_age) {
    this.qp_age = +qp_age
  }

  fillQPReportDate() {
    console.log(this.qp_reportedDate)
  }

  fillQPMobile(qp_mobile) {
    this.qp_mobile = qp_mobile
  }

  fillQPPhone(qp_phone) {
    this.qp_phone = qp_phone
  }

  fillQPInformedDate() {
    console.log(this.qp_informedDate)
  }*/

  canUseApp(event) {
    this.qp_appEnable = event.checked
  }

  addNewPerson() {
    this.q_person.address = { id: null, line: this.qp_address }
    this.q_person.age = this.qp_age
    this.q_person.appEnable = this.qp_appEnable
    this.q_person.id = null
    //  this.q_person.arrivalDate = "2020-02-10"
    this.q_person.countryId = this.qp_countryId
    this.q_person.fileNo = this.qp_fileNo
    this.q_person.gramaSewaDivisionId = this.qp_gramaSewaDivisionId
    this.q_person.guardianDetails = null
    this.q_person.informedDate = this.qp_informedDate
    this.q_person.inspectorIds = null
    this.q_person.name = this.qp_name
    this.q_person.mobile = this.qp_mobile
    this.q_person.phone = this.qp_phone
    this.q_person.reportedDate = this.qp_reportedDate
    this.q_person.nic = this.qp_nic
    this.q_person.passportNo = this.qp_passportNo
    this.q_person.secret = "hi"

    console.log(this.q_person)
    this.setQuarantinePerson()
  }

  resetForm(){
    // this.qp_division = "";
    // this.qp_policeStation = "";
    // this.qp_gramaSewaDivisionName = "";
    // this.qp_gramaSewaDivisionId = null;
    this.qp_fileNo = null;

    this.qp_nic = "";
    this.qp_passportNo = "";
    this.qp_name = "";
    this.qp_address = "";
    this.qp_age = null
    this.qp_reportedDate = "";
    this.qp_mobile  = "";
    this.qp_phone = "";
    this.qp_appEnable = null

    this.qp_arrivalDate = "";
    this.qp_countryName = "";
    this.qp_countryId = "";
    this.qp_informedDate = "";
  }

}
