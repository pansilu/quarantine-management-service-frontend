export class GraphDataRequestModel {
    covidCaseType: string
    districtId: number
    divisionId: number
    endDate: string
    gndId: number
    graphType: string
    provinceId: number
    startDate: string
    districtIdList: Array<number>


    constructor() {
        this.endDate = null
        this.startDate = null
        this.districtIdList = new Array<number>()
    }
}