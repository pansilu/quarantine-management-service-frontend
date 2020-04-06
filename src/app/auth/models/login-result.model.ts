export class LoginResultModel {
    userName: string;
    loggedTime: Date;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    userImage: string;
    userRole: string;
    token:string
    createUser:boolean
    //loggedCompany: number;
    //loggedBranch: number;
    userId: number;

    constructor(obj?: LoginResultModel) {
        this.loggedTime = new Date(obj.loggedTime);
        this.userName = obj.userName;
        this.access_token = obj.access_token;
        this.expires_in = obj.expires_in;
        this.refresh_token = obj.refresh_token;
        this.userImage = obj.userImage;
        this.userRole = obj.userRole;
        //this.loggedCompany = obj.loggedCompany;
        //this.loggedBranch = obj.loggedBranch;
        this.userId = obj.userId;
        this.createUser = obj.createUser
    }
}
