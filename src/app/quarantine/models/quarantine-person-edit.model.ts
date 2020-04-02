class QuarantinePersonEditModel {
    public id : number
    public fileNo:string
    public name:string
    public entryDate:Date
    public address:string
    public nic:string
    public passportNo:string
    public reporter:InvestigatorModel

    constructor(){
        this.id = -1
        this.reporter = new InvestigatorModel()
    }
}