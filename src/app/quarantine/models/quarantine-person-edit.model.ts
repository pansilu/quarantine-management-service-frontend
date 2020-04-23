import { NameIdModel } from 'src/app/shared/models/name-id.model'
// import { RecivedGramaSewaDivisionModel } from './quarantine-person-get.model'

export class QuarantinePersonEditModel {
    public division: string
    public stationId: number
    public officers: []
    public address: address
    public age: number
    public appEnable: boolean
    public id: number
    public arrivalDate: string
    public countryId: number
    public fileNo: string
    public gramaSewaDivisionId: number
    public guardianDetails: guardianDetails
    public informedDate: string
    public inspectorIds: []
    public name: string
    public mobile: string
    public phone: string
    public reportedDate: string
    public nic: string
    public passportNo: string
    public secret: string
    public otherFacts: string
    public admittedDate: string
    public admitHosId: number /** shuld change **/
    public dischargedDate: string
    public confirmedDate: string
    public confirmedHosId: number  /** shuld change **/
    public noticeAttachDate: string

    // To map Get request only
    admitHos: NameIdModel
    confirmedHos: NameIdModel
    arrivedCountry: NameIdModel
    // gramaSewaDivision: RecivedGramaSewaDivisionModel
    stationResDto: RecivedStationModel
    informedAuthority: boolean
    reportDate: string
    inspectorDetails: Array<NameIdModel>
    ///*********************///

    constructor() {
        this.address = new address('', null)
        this.guardianDetails = new guardianDetails()
        this.admitHos = new NameIdModel('', null)
        this.confirmedHos = new NameIdModel('', null)
    }
}

export class address {
    id: number
    line: string
    lat: number
    lng: number
    constructor(line: string, id: number) {
        this.id = id;
        this.line = line;
    }
}

export class guardianDetails {
    id: number
    name: string
    mobile: string
    nic: string
    passportNo: string
}

export class RecivedStationModel {
    public id: number
    public name: string
    public division: NameIdModel

    constructor() {

    }
}

