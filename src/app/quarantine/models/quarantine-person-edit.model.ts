export class QuarantinePersonEditModel {
    public division:string
    public policeStation:string

    public address:address
    public age:number
    public appEnable:boolean
    public id:number
    public arrivalDate:string
    public countryId:string
    public fileNo:string
    public gramaSewaDivisionId:string
    public guardianDetails:guardianDetails
    public informedDate:string
    public inspectorIds:[]
    public name:string
    public mobile:string
    public phone:string
    public reportedDate:string
    public nic:string
    public passportNo:string
    public secret: string
    public otherFacts:string
    public admittedDate:string
    public admitHosId:number
    public dischargedDate:string
    public confirmedDate:string
    public confirmedHosId:number


    constructor(){
        this.address = new address()
        this.guardianDetails = new guardianDetails()
    }
}

export class address{
    id:number
    line:string
}

export class guardianDetails{
    id:number
    name: string
    mobile:string
    nic:string
    passportNo:string
}

