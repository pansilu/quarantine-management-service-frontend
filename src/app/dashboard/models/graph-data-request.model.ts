export class GraphDataRequestModel {
    endDate: string
    graphType: string
    quserType: string
    startDate: string
    stationIds: Array<number>
    divisionIds: Array<number>

    constructor(){
        this.endDate = null
        this.startDate = null
        this.stationIds = new Array<number>()
        this.divisionIds = new Array<number>()
    }
}