import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ThematicModel, ThematicModelDropDown } from '../models/thematic.model'

@Component({
  selector: 'sdrc-thematic-dashboard',
  templateUrl: './thematic-dashboard.component.html',
  styleUrls: ['./thematic-dashboard.component.scss']
})
export class ThematicDashboardComponent implements OnInit {
  thematicData: any;
  legends: ThematicModel;
  mapData:any
  thematicDropDownList: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getThematicDropDownList().subscribe(drpData =>{
      this.thematicDropDownList = drpData;    
    }) 
  }
  selectDropdown(selectedOption, model, index){
    this.thematicDropDownList[index].value = selectedOption.value;
    this.thematicDropDownList[index].key = selectedOption.key;

    let selected=true;
    this.thematicDropDownList.forEach(element => {
      //console.log(element.value);
      if(!element.value)
      {
        selected=false;
        return;
      }
    });

    if(selected)
    {
     this.getThematicData();
    }

  }
  getThematicData()
  {
    this.dashboardService.getThematicData().subscribe(data =>{
      this.thematicData = data;
      this.mapData=data.dataCollection;
      this.legends = this.thematicData.legends;              
    })
  }
}
