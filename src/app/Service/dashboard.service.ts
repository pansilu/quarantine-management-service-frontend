import { Injectable } from '@angular/core';
import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { GraphDataModel } from '../dashboard/models/graph-data.model';
import { GraphDataRequestModel } from '../dashboard/models/graph-data-request.model';
import { UserStationModel } from '../dashboard/models/user-station.model';
import { NameIdModel } from '../shared/models/name-id.model';
import { MapDataRequestModel } from '../dashboard/models/map-data-request.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _: ServiceHelper, private _http: HttpClient) { }

  getGraphData(data: NextCallback<any>, error: ErrorCallback<ErrorModel>, model: GraphDataRequestModel) {
    this._.api()
      .url('api/graph')
      .json(model)
      .needJson()
      .put(data, error)
  }

  getMarkers(data: NextCallback<any>, error: ErrorCallback<ErrorModel>, model: MapDataRequestModel) {
    this._.api()
      .url('api/graph/map')
      .json(model)
      .needJson()
      .put(data, error)
  }

  getprovinces(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, search?) {
    this._.api()
      .url('api/location/province')
      .needJson()
      .get(data, error);
  }

  getDistricts(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
    this._.api()
      .url(`api/location/province/${id}/district`)
      .needJson()
      .get(data, error);
  }

  getAllDistricts(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>) {
    this._.api()
      .url(`api/location/district`)
      .needJson()
      .get(data, error);
  }

  getDivisions(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
    this._.api()
      .url(`api/location/district/${id}/division`)
      .needJson()
      .get(data, error);
  }

  getGnds(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
    this._.api()
      .url(`api/location/division/${id}/gnd`)
      .needJson()
      .get(data, error);
  }

  getDistrictsFeatures(data: NextCallback<Array<any>>, error: ErrorCallback<ErrorModel>, ids: Array<number>) {
    var qury: string = "";
    if (ids.length > 0) {
      qury = `districtIds=${ids[0]}`

      for (let i = 1; i < ids.length; i++) {
        qury = qury + `&districtIds=${ids[i]}`
      }
    }

    this._.api()
      .url(`api/location/district`)
      .needJson()
      .get(data, error, qury);
  }

  getUser(data: NextCallback<Array<any>>, error: ErrorCallback<ErrorModel>, id:number) {
    this._.api()
      .url(`api/graph/map/user/${id}`)
      .needJson()
      .get(data, error);
  }
}
