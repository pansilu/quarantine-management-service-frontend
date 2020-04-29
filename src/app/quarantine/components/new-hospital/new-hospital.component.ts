import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Service/toast.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { HospitalService } from 'src/app/Service/hospital.service';

@Component({
  selector: 'app-new-hospital',
  templateUrl: './new-hospital.component.html',
  styleUrls: ['./new-hospital.component.scss']
})
export class NewHospitalComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _hospitalService: HospitalService, private _toast: ToastService, private _errorHandlerService: ErrorHandlerService) { }
  edit: boolean;
  form: FormGroup;
  submitted: boolean
  @Output('save') save: EventEmitter<boolean> = new EventEmitter<boolean>();


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const model = {
      name: new FormControl(undefined, Validators.required),
    };
    this.form = this._formBuilder.group(model);
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const value = this.form.value
      value.id = null;
      value.lat = null;
      value.lon = null;

      this._hospitalService.newHospital((data) => {
        this.save.emit(true);
        this._toast.success("Success", "Center saved")
      }, (e) => {
        this._errorHandlerService.Handler(e)
      }, value);
    }
  }

}
