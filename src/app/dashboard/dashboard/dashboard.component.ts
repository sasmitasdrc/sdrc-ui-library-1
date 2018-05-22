import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { GoogleMapModel } from '../models/google-map.model';
import { LineChartModel } from '../models/line-chart.model';
import { SpiderChartModel } from '../models/spider-chart.model';
import { BarchartModel } from '../models/barchart.model';
import { DonutChartModel } from '../models/donut-chart.model';

@Component({
  selector: 'sdrc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  selectionInputs: any;
  spiderData: SpiderChartModel;
  mapData: GoogleMapModel[];
  lineChartData:LineChartModel[];
  barChartData: BarchartModel[];
  donutChartData: DonutChartModel

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.dashboardService.getSelectionInputs().subscribe(response => {
      this.selectionInputs = response;
    })
    this.dashboardService.getSpiderChart().subscribe(data=>{
      this.spiderData =  <SpiderChartModel>data;
    })

    this.dashboardService.getLineChartData().subscribe(data=>{
      this.lineChartData = <LineChartModel[]>data;
    })

    this.dashboardService.getBarChartData().subscribe(data=>{
      this.barChartData =  <BarchartModel[]>data;
    })

    this.dashboardService.getMapData().subscribe(data=>{
      this.mapData =  <GoogleMapModel[]>data;
    })

    this.dashboardService.getDonutChartData().subscribe(data=>{
      this.donutChartData =  <DonutChartModel>data;
    })

  }

  selectDropdown(selectedOption, model, index){
    this.selectionInputs[index].value = selectedOption.value;
    this.selectionInputs[index].key = selectedOption.key;
  }

}
