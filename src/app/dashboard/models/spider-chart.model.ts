

export interface SingleSpiderModel{
    axis: string;
    value: string;
    timePeriod: string;
}


export interface SpiderChartModel {
    dataCollection: [[SingleSpiderModel]];
}
