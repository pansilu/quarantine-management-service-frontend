import { NameIdModel } from 'src/app/shared/models/name-id.model'

export class LocationModel {
    id: number
    name: string
    stations:Array<NameIdModel>
    gramaSewaDivisions:Array<NameIdModel>
}