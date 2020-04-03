import { NameIdModel } from 'src/app/shared/models/name-id.model'

export class LocationModel {
    id: number
    name: string
    stations:Array<NameIdModel>
    gramaSewaDivisions:Array<NameIdModel>

    constructor(){
        this.stations = new Array<NameIdModel>();
        this. gramaSewaDivisions = Array<NameIdModel>();
    }
}