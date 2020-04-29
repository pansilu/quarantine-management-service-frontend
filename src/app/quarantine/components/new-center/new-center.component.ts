import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Service/toast.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { QuarantineCenterService } from 'src/app/Service/quarantine-center.service';

@Component({
  selector: 'app-new-center',
  templateUrl: './new-center.component.html',
  styleUrls: ['./new-center.component.scss']
})
export class NewCenterComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _quarantineCenterService: QuarantineCenterService, private _toast: ToastService, private _errorHandlerService: ErrorHandlerService) { }
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

      this._quarantineCenterService.newQuarantineCenter((data) => {
        this.save.emit(true);
        this._toast.success("Success", "Center saved")
      }, (e) => {
        this._errorHandlerService.Handler(e)
      }, value);
    }
  }

}
