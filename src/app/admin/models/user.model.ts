export class UserModel {
    public canCreateUser: boolean
    public id: number
    public name: string
    public mobile: string
    public nic: string
    public officeId: string
    public passportNo:string
    // public phone: string
    public rank: string
    // public role: number
    public stationIdList:Array<number>

    constructor() {
        this.stationIdList = new Array<number>();
        this.canCreateUser = false;
        this.id = null;
        // this.role = 0;
    }
}