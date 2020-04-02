import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.scss']
})
export class AddEditPersonComponent implements OnInit {

  isSuspected: boolean;
  isInfected: boolean;

  constructor() { }

  ngOnInit() {
    this.isSuspected = false;
    this.isInfected = false;
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
