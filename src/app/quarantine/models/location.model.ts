class LocationModel {
    public id:number
    public name:string
    public stations:stations[]
}

interface stations{
    id:number
    name:string
    gramaSewaDivisions:gramaSewaDivisions[]
}

interface gramaSewaDivisions{
    id:number
    name:string
}