import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { Injectable } from '@angular/core';
import { PagedResultModel } from '../common/models/paged-result.model';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';
import { QuarantinePersonEditModel } from '../quarantine/models/quarantine-person-edit.model';
import { QuarantinePersonViewModel } from '../quarantine/models/quarantine-person-view.model';
import { DailyUpdatesViewModel } from '../quarantine/models/daily-updates-view.model';
import { UserViewModel } from '../quarantine/models/user-view.model';
import { NameIdModel } from '../shared/models/name-id.model';
import { AddressModel } from '../quarantine/models/address.model';
import { NameIdLocationModel } from '../shared/models/name-id-location.model';
import { PCaseModel } from '../quarantine/models/pCase.model';

@Injectable({
    providedIn: 'root'
})
export class QuarantineService {

    constructor(private _: ServiceHelper, private _http: HttpClient) { }

    // Sample api call
    getQUsers(data: NextCallback<PagedResultModel<QuarantinePersonViewModel>>, error: ErrorCallback<ErrorModel>, size: number, page: number, sort: string, search?: string,status?:string) {
        this._.api()
            .url('api/user/quarantine')
            .needJson()
            .get(data, error, `size=${size}&page=${page}&sort=${sort}&search=${search}&status=${status}`);
    }

    getUsers(data: NextCallback<PagedResultModel<UserViewModel>>, error: ErrorCallback<ErrorModel>, size: number, page: number, sort: string, search: string) {
        this._.api()
            .url('api/user/admin')
            .needJson()
            .get(data, error, `size=${size}&page=${page}&sort=${sort}&search=${search}`);
    }

    getCountries(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/misc/country')
            .needJson()
            .get(data, error);
    }

    getPCases(data: NextCallback<Array<PCaseModel>>, error: ErrorCallback<ErrorModel> , search? :string){
        this._.api()
            .url('api/user/quarantine/pc/case')
            .needJson()
            .get(data, error, `search=${search}`);
    }

    getLocation(data: NextCallback<Array<LocationModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/user/admin/location')
            .needJson()
            .get(data, error);
    }

    getAddresses(data: NextCallback<Array<AddressModel>>, error: ErrorCallback<ErrorModel>, id:number,addressLine: any) {
        this._.api()
            .url(`api/misc/address/gnd/${id}`)
            .needJson()
            .get(data, error, `line=${addressLine}`);
    }

    getOfficerDetails(data: NextCallback<Array<OfficerDetailsModel>>, error: ErrorCallback<ErrorModel>, officer: any) {
        this._.api()
            .url('api/user/admin/filter')
            .json(officer)
            .needJson()
            .post(data, error);
    }

    getHospitals(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>) {
        this._.api()
            .url('api/hospital')
            .needJson()
            .get(data, error);
    }

    setQuarantinePerson(data: NextCallback<Array<QuarantinePersonEditModel>>, error: ErrorCallback<ErrorModel>, model: any) {
        this._.api()
            .url('api/user/quarantine')
            .json(model)
            .needJson()
            .post(data, error);
    }

    getDailyUpdates(data: NextCallback<DailyUpdatesViewModel>, error: ErrorCallback<ErrorModel>, id: number) {
        this._.api()
            .url(`api/user/quarantine/point/${id}`)
            .needJson()
            .get(data, error);
    }

    getQPerson(data: NextCallback<QuarantinePersonEditModel>, error: ErrorCallback<ErrorModel>, id: number) {
        this._.api()
            .url(`api/user/quarantine/${id}`)
            .needJson()
            .get(data, error);
    }

    getQuarantineCenters(data: NextCallback<Array<NameIdLocationModel>>, error: ErrorCallback<ErrorModel>, search?) {
        this._.api()
            .url('api/quarantine/center')
            .needJson()
            .get(data, error);
    }

    getprovinces(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, search?) {
        this._.api()
            .url('api/location/province')
            .needJson()
            .get(data, error);
    }

    getDistrict(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
        this._.api()
            .url(`api/location/province/${id}/district`)
            .needJson()
            .get(data, error);
    }

    getDivision(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
        this._.api()
            .url(`api/location/district/${id}/division`)
            .needJson()
            .get(data, error);
    }

    getGnd(data: NextCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>, id: number, search?: string) {
        this._.api()
            .url(`api/location/division/${id}/gnd`)
            .needJson()
            .get(data, error);
    }

    getGndById(data: NextCallback<any>, error: ErrorCallback<ErrorModel>, id: number) {
        this._.api()
            .url(`api/location/gnd/${id}`)
            .needJson()
            .get(data, error);
    }

}
