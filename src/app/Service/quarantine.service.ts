import { ServiceHelper, NextCallback, ErrorCallback } from './service.helper';
import { Injectable } from '@angular/core';
import { PagedResultModel } from '../common/models/paged-result.model';
import { ErrorModel } from '../common/models/error-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuarantineService {

    constructor(private _: ServiceHelper, private _http: HttpClient) { }

    // Sample api call
    // getDatatypes(data: NextCallback<PagedResultModel<DataTypeView>>, error: ErrorCallback<ErrorModel>, skip: number, take: number, search?: string) {
    //     this._.api()
    //         .url('api/DataType')
    //         .needJson()
    //         .get(data, error, `skip=${skip}&take=${take}&searchText=${search}`);
    // }
}
