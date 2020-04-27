import { Injectable } from '@angular/core';
import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { NameIdModel } from '../shared/models/name-id.model';
import { NameIdLocationModel } from '../shared/models/name-id-location.model';
@Injectable({
  providedIn: 'root'
})
export class QuarantineCenterService {

  constructor(private _: ServiceHelper, private _http: HttpClient) { }

  // Sample api call
  getQuarantineCenters(data: NextCallback<Array<NameIdLocationModel>>, error: ErrorCallback<ErrorModel>,search?) {
    this._.api()
      .url('api/quarantine/center')
      .needJson()
      .get(data, error);
  }

  getQuarantineCenter(data: NextCallback<Array<NameIdLocationModel>>, error: ErrorCallback<ErrorModel>,id:number) {
    this._.api()
      .url(`api/user/admin/location/${id}`)
      .needJson()
      .get(data, error);
  }

  newQuarantineCenter(data: NextCallback<Array<NameIdLocationModel>>, error: ErrorCallback<ErrorModel>,model:NameIdLocationModel) {
    this._.api()
      .url('api/quarantine/center')
      .json(model)
      .needJson()
      .post(data, error);
  }

}
