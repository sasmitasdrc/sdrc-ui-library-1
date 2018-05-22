import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ThematicModel, ThematicModelDropDown } from '../models/thematic.model'

@Component({
  selector: 'sdrc-thematic-dashboard',
  templateUrl: './thematic-dashboard.component.html',
  styleUrls: ['./thematic-dashboard.component.scss']
})
export class ThematicDashboardComponent implements OnInit {
  thematicData: ThematicModel;
  legends: ThematicModel;
  thematicDropDownList: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    
    this.dashboardService.getThematicData().subscribe(data =>{
      this.thematicData = data;
      console.log(this.thematicData);
      this.legends = this.thematicData.legends;       
      console.log(this.legends);          
     })

     this.dashboardService.getThematicDropDownList().subscribe(drpData =>{
      this.thematicDropDownList = drpData;
      console.log(this.thematicDropDownList);      
    }) 
  }
  selectDropdown(selectedOption, model, index){
    // this.selectionInputs[index].value = selectedOption.value;
    // this.selectionInputs[index].key = selectedOption.key;
  }
}
