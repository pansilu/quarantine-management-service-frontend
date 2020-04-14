import { Injectable } from '@angular/core';
import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { GraphDataModel } from '../dashboard/models/graph-data.model';
import { GraphDataRequestModel } from '../dashboard/models/graph-data-request.model';
import { UserStationModel } from '../dashboard/models/user-station.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _: ServiceHelper, private _http: HttpClient) { }

  getLocations(data: NextCallback<Array<UserStationModel>>, error: ErrorCallback<ErrorModel>) {
    this._.api()
      .url('api/user/admin/location')
      .needJson()
      .get(data, error);
  }

  getGraphData(data: NextCallback<GraphDataModel>, error: ErrorCallback<ErrorModel>, model:GraphDataRequestModel){
    this._.api()
    .url('api/graph')
    .json(model)
    .needJson()
    .put(data,error)
  }
}
