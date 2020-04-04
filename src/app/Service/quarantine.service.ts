import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { Injectable } from '@angular/core';
import { PagedResultModel } from '../common/models/paged-result.model';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { QuarantinePersonEditModel } from '../quarantine/models/quarantine-person-edit.model';
import { QuarantinePersonViewModel } from '../quarantine/models/quarantine-person-view.model';

@Injectable({
    providedIn: 'root'
})
export class QuarantineService {

    constructor(private _: ServiceHelper, private _http: HttpClient) { }

    // Sample api call
    getDatatypes(data: NextCallback<PagedResultModel<QuarantinePersonViewModel>>, error: ErrorCallback<ErrorModel>, offset: number, pageNumber: number, pageSize: number) {
        this._.api()
            .url('api/user/quarantine')
            .needJson()
            .get(data, error, `offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
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

    getOfficerDetails(data: NextCallback<Array<OfficerDetailsModel>>, error: ErrorCallback<ErrorModel>, officer : any) {
        this._.api()
            .url('api/user/admin/filter')
            .json(officer)
            .needJson()
            .post(data, error);
    }

    getHospitals(data: NextCallback<Array<CountryModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/misc/all-hospitals')
            .needJson()
            .get(data, error);
    }

    setQuarantinePerson(data: NextCallback<Array<QuarantinePersonEditModel>>, error: ErrorCallback<ErrorModel>, model : any) {
        this._.api()
            .url('api/user/quarantine')
            .json(model)
            .needJson()
            .post(data, error);
    }

    getDailyUpdates(data: NextCallback<Array<LocationModel>>, error: ErrorCallback<ErrorModel>,id:number) {
        this._.api()
            .url(`api/user/quarantine/point/${id}`)
            .needJson()
            .get(data, error);
    }


}
