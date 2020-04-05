import { address, guardianDetails } from './quarantine-person-edit.model'
import { NameIdModel } from 'src/app/shared/models/name-id.model'

export class QuarantinePersonGetModel {

    address: address
    admitHospital: NameIdModel
    admittedDate: string
    age: number
    appEnable: boolean
    arrivalDate: string
    arrivedCountry: NameIdModel
    confirmedDate: string
    confirmedHospital: NameIdModel
    dischargedDate: string
    fileNo: string
    gramaSewaDivision: RecivedGramaSewaDivisionModel
    guardianDetails: guardianDetails
    id: number
    informedAuthority: boolean
    informedDate: string
    mobile: string
    name: string
    nic: string
    noticeAttachDate: string
    otherFacts: string
    passportNo: string
    phone: string
    reportDate: string
    secret: string

    public division:string
    public policeStation:string
    public officers:[]
    public countryId:string
    public gramaSewaDivisionId:string
    public inspectorIds:[]
    public reportedDate:string
    public admitHosId:number
    public confirmedHosId:number


    constructor(parameters) {

    }
}


export class RecivedGramaSewaDivisionModel {
    public id: number
    public name: string
    public station: RecivedStationModel

    constructor() {

    }
}

export class RecivedStationModel {
    public id: number
    public name: string
    public division: NameIdModel

    constructor() {

    }
}

export class InspectorDetailsModel {
    public id:number
    public rank:string
}