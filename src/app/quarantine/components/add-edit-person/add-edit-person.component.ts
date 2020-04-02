import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {

  isMigrated: boolean;
  isInformed: boolean;
  isSuspected: boolean;
  isInfected: boolean;

  constructor() { }

  ngOnInit() {
    this.isMigrated = false;
    this.isInformed = false;
    this.isSuspected = false;
    this.isInfected = false;
  }

  checkIfMigrated(event){
    if(event.target.checked){
      this.isMigrated = true;
    } else {
      this.isMigrated = false;
    }
  }

  checkIfInformed(event){
    if(event.target.checked){
      this.isInformed = true;
    } else {
      this.isInformed = false;
    }
  }

  checkIfSuspected(event){
    if(event.target.checked){
      this.isSuspected = true;
    } else {
      this.isSuspected = false;
    }
  }

  checkIfInfected(event){
    if(event.target.checked){
      this.isInfected = true;
    } else {
      this.isInfected = false;
    }
  }

}
