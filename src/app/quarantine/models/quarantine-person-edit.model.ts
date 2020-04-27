import { NameIdModel } from 'src/app/shared/models/name-id.model'
import { AddressModel } from './address.model'
import { UserStatusDetailModel } from './user-status-details.model'
// import { RecivedGramaSewaDivisionModel } from './quarantine-person-get.model'

export class QuarantinePersonEditModel {
    public province:number
    public district:number
    public dsDivision:number
    public id: number
    public age: number
    public arrivalDate: string
    public countryId: number
    public gender: string
    public mobile: string
    public name: string
    public nic: string
    public passportNo: string
    public phone: string
    public address: AddressModel
    public userStatusDetails: Array<UserStatusDetailModel>

    constructor(){
        this.address = new AddressModel();
        this.userStatusDetails = new Array<UserStatusDetailModel>();
    }
}