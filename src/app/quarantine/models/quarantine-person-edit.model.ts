import { NameIdModel } from 'src/app/shared/models/name-id.model'
import { RecivedGramaSewaDivisionModel } from './quarantine-person-get.model'

export class QuarantinePersonEditModel {
    public division: string
    public policeStation: number
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
    gramaSewaDivision: RecivedGramaSewaDivisionModel
    informedAuthority: boolean
    reportDate: string
    inspectorDetails:Array<NameIdModel>
    ///*********************///

    constructor() {
        this.address = new address()
        this.guardianDetails = new guardianDetails()
        this.admitHos = new NameIdModel('',null)
        this.confirmedHos = new NameIdModel('',null)
    }
}

export class address {
    id: number
    line: string
}

export class guardianDetails {
    id: number
    name: string
    mobile: string
    nic: string
    passportNo: string
}

