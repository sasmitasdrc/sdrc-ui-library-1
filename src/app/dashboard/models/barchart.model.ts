
export interface SingleBarModel{
    axis: string;
    value: string;
}


export interface BarchartModel {
    dataCollection: [[SingleBarModel]];
}
