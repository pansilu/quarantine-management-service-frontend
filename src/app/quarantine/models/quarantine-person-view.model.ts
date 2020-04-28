import { AddressModel } from './address.model'
import { NameIdModel } from 'src/app/shared/models/name-id.model'

export class QuarantinePersonViewModel {
    address: AddressModel
    age: number
    arrivalDate: string
    arrivedCountry: NameIdModel
    id: number
    mobile: string
    name: string
    nic: string
    passportNo: string
    phone: string
    constructor() {

    }
}