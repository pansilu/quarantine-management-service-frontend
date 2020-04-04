import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { Injectable } from '@angular/core';
import { PagedResultModel } from '../common/models/paged-result.model';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { QuarantinePersonEditModel } from '../quarantine/models/quarantine-person-edit.model';

@Injectable({
    providedIn: 'root'
})
export class QuarantineService {

    constructor(private _: ServiceHelper, private _http: HttpClient) { }

    // Sample api call
    getDatatypes(data: NextCallback<PagedResultModel<String>>, error: ErrorCallback<ErrorModel>, skip: number, take: number, search?: string) {
        this._.api()
            .url('api/DataType')
            .needJson()
            .get(data, error, `skip=${skip}&take=${take}&searchText=${search}`);
    }

    getCountries(data: NextCallback<Array<CountryModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/misc/all-countries')
            .needJson()
            .get(data, error);
    }

    getLocation(data: NextCallback<Array<LocationModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/user/admin/location')
            .needJson()
            .get(data, error);
    }

    getOfficerDetails(data: NextCallback<Array<OfficerDetailsModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/user/admin/filter')
            .json({
                "ranks":null,
                "stationIds": null
              })
            .needJson()
            .post(data, error);
    }


    setQuarantinePerson(data: NextCallback<Array<QuarantinePersonEditModel>>, error: ErrorCallback<ErrorModel>, model : any) {
        this._.api()
            .url('api/user/quarantine')
            .json(model)
            .needJson()
            .post(data, error);
    }

}
