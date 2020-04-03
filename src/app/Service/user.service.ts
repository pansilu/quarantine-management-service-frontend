import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { Injectable } from '@angular/core';
import { PagedResultModel } from '../common/models/paged-result.model';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from '../admin/models/location.model';
import { UserModel } from '../admin/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _: ServiceHelper, private _http: HttpClient) { }

  // Sample api call
  getLocations(data: NextCallback<Array<LocationModel>>, error: ErrorCallback<ErrorModel>) {
    this._.api()
      .url('api/user/admin/location')
      .needJson()
      .get(data, error);
  }

  addUser(data: NextCallback<Array<LocationModel>>, error: ErrorCallback<ErrorModel>,user:UserModel){
    this._.api()
      .url('api/user/admin')
      .hasUrlencoded()
      .json(user)
      .needJson()
      .post(data, error);
  }
}
