import { NameIdModel } from 'src/app/shared/models/name-id.model'

export class UserStationModel {
    public id:number
    public name:string
    public stations:Array<NameIdModel>

    constructor(){
        this.stations = new Array<NameIdModel>();
    }
}