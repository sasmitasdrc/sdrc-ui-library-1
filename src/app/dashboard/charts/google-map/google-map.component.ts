import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
import { AgmMap } from '@agm/core';
import { DashboardService } from '../../services/dashboard.service';

import { GoogleMapModel } from '../../models/google-map.model';


@Component({
  selector: 'sdrc-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  title: string = 'My first AGM project';
  zoom: number = 6;
  lat: number = 22.983170000000005;
  lng: number = 83.0379;

  mapMarkers: GoogleMapModel[];

  ngOnInit() {
    this.dashboardService.getMapData().subscribe(data=>{
      this.mapMarkers = [{"id":137,"areaID":"853","dataValue":"53.7","longitude":83.0379,"latitude":22.983170000000005,"images":"assets/images/facilities/1478586210571.jpg,resources/images/facilities/1478586485599.jpg,resources/images/facilities/1478586697841.jpg","title":"CHC Lakhanpur","showWindow":false,"icon":"assets/images/pushpins/CHC_red.png","dateOfVisit":"2016-11-08"},{"id":141,"areaID":"726","dataValue":"34.9","longitude":80.749355,"latitude":18.485616666666665,"images":"resources/images/facilities/1478594064070.jpg,resources/images/facilities/1478594151749.jpg,resources/images/facilities/1478594213091.jpg","title":"CHC Usoor","showWindow":false,"icon":"assets/images/pushpins/CHC_red.png","dateOfVisit":"2016-11-08"},{"id":143,"areaID":"773","dataValue":"52.0","longitude":84.05565999999999,"latitude":22.997341666666664,"images":"resources/images/facilities/1478681620486.jpg,resources/images/facilities/1478681685140.jpg,resources/images/facilities/1478681770122.jpg","title":"CHC Manora","showWindow":false,"icon":"assets/images/pushpins/CHC_red.png","dateOfVisit":"2016-11-09"}];
      console.log(this.mapMarkers)
    })
  }
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  @ViewChildren(AgmSnazzyInfoWindow) snazzyWindowChildren:QueryList<AgmSnazzyInfoWindow>;
  
  showInfoWindow(marker, marker_index){
    let livewindow = this.snazzyWindowChildren.find((window, i)=>{return i === marker_index});
    livewindow._openInfoWindow();
  }
  hideInfoWindow(marker_index){
    let livewindow = this.snazzyWindowChildren.find((window, i)=>{return i === marker_index});
    livewindow._closeInfoWindow();
  }
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  
  // markers: marker[] = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.815982,
	// 	  label: 'A',
	// 	  draggable: true
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.215982,
	// 	  label: 'B',
	// 	  draggable: false
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',
	// 	  draggable: true
	//   }
  // ]
}
// // just an interface for type safety.
// interface marker {
// 	lat: number;
// 	lng: number;
// 	label?: string;
// 	draggable: boolean;
// }
