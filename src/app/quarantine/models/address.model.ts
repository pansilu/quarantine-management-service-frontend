export class AddressModel {
    id: number
    line: string
    lat: number
    lon: number
    gndId:number
    policeArea: string
    town: string
    village: string
    constructor() {
        this.lat = 7.723867
        this.lon = 80.771878
        this.id = null;
        this.line = "";
    }
}