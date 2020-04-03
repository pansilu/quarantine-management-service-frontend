export class QuarantinePersonEditModel {
    public address:address[]
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
}

interface address{
    id:number
    line:string
}

interface guardianDetails{
    id:number
    mobile:string
    nic:string
    passportNo:string
}

