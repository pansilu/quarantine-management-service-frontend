export class MapDataRequestModel {
    covidCaseType: string
    districtIds: Array<number>
    constructor() {
        this.districtIds = new Array<number>();
        this.covidCaseType = "ALL"
    }
}