class OfficerDetailsModel {
    public age: string
    public id: string
    public mobile: string
    public name: string
    public nic: string
    public officeId: string
    public passportNo: string
    public phone: string
    public rank: string
    public stations: stations
}

interface station {
    id:number
    name:string
    gramaSewaDivisions:gramaSewaDivisions
}

interface gramaSewaDivisions{
    id:number
    name:string
}