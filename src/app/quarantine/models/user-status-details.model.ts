export class UserStatusDetailModel {
    public id: number
    public caseNum: string
    public delete: boolean
    public description: string
    public endDate: string
    public hospitalId: number
    public parentCaseNum: string
    public qCenterId: number
    public startDate: string
    public type: string

    constructor(){
        this.type = "HOUSE_QUARANTINE"
        this.id = null
        this.delete = false;
    }
}