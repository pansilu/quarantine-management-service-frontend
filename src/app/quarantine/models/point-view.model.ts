export class PointViewModel {
    date:Date
    pointValues:PointValueModel

    constructor(){
        this.date = new Date();
        this.pointValues = new PointValueModel();
    }
}


class PointValueModel{
    THROAT: boolean
    DIARRHEA: boolean
    BREATH: boolean
    HEADACHE: boolean
    FATIGUE: boolean
    COLD: boolean
    MYALGIA: boolean
    COUGH: boolean
    FEVER: boolean
}