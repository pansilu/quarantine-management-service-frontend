import { PointViewModel } from './point-view.model';

export class DailyUpdatesViewModel {
    userId: number
    name: string
    dailyUpdates: Array<PointViewModel>

    constructor (){
        this.dailyUpdates = Array<PointViewModel>();
    }
}

