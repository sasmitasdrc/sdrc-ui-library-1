import { Component, OnInit, HostListener, ElementRef,Input } from '@angular/core';
import * as d3 from 'd3v4';
import * as topojson from 'topojson';
import { DashboardService } from '../../services/dashboard.service';
import { ThematicModel } from '../../models/thematic.model';

@Component({
  selector: 'sdrc-thematic-view',
  templateUrl: './thematic-view.component.html',
  styleUrls: ['./thematic-view.component.scss']
})
export class ThematicViewComponent implements OnInit {
  width;
  height;
  projection;
  path;
  svg;
  g: any;
  mapContainerDiv;
  thematicData: any;
  legends: any;
  thematicDropDownList: any;
  ngContentId:any;

  @Input()
  mapData:any;

  constructor(private hostRef: ElementRef) {
  }

   ngOnInit() {
    this.ngContentId = '_ngcontent-' + this.hostRef.nativeElement.attributes[1].name.substr(8);
      this.width = 800;
      this.height = 400;
      this.projection = d3.geoMercator();
      this.path = d3.geoPath()
        .projection(this.projection)
        .pointRadius(2);
      this.svg = d3.select("#map").append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      this.g = this.svg.append("g");
          
      d3.json("assets/india.json", (error, data) => {
        let boundary = this.centerZoom(data);
        let subunits = this.drawSubUnits(data);
        this.colorSubunits(subunits);     
      });

      console.log(this.mapData)
  }

  centerZoom(data) {
    let o = topojson.mesh(data, data.objects.layer1, (a, b) => {
      return a === b;
    });

    this.projection
      .scale(1)
      .translate([0, 0]);

    let b = this.path.bounds(o),
      s = 1 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height),
      t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];

    let p = this.projection
      .scale(s)
      .translate(t);
    //console.log(o);    
    return o;
  }

  // drawOuterBoundary(data, boundary) {

  //   this.g.append("path")
  //     .datum(boundary)
  //     .attr("d", this.path)
  //     .attr("class", "subunit-boundary")
  //     .attr("fill", "none")
  //     .attr("stroke", "#666");
  // }

  drawSubUnits(data) {

    let subunits = this.g.selectAll(".subunit")
      .data(topojson.feature(data, data.objects.layer1).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("d", this.path)
      .style("stroke", "#fff")
      .style("stroke-width", "1px").attr(this.ngContentId, "");

    return subunits;
  }

  colorSubunits(subunits) {
    subunits
      .attr("class",  (d, i) =>{
        let selectedArea = this.mapData[d.properties.ID_];
         if(selectedArea)
         return selectedArea.cssClass;
         else
         return "fourthslices";
      })
      .style("opacity", ".7")
      .on("mouseout",(d)=>this.onmouseout())
      .on("mouseover", (d) =>
        this.onover(d)
      );
  }
  onover(d){    
      var rank,datavalue;

      let selectedArea = this.mapData[d.properties.ID_];
      d3.select(".map_popover_content").html(
       "<strong>Area Name:</strong> <span style='color:black'>"
          + d.properties.NAME1_ + "</span>");
  
       if (selectedArea) {
              rank = selectedArea.cssClass;
              datavalue=selectedArea.value;
        }else{
              rank = "Not Available";
              datavalue = "Not Available";
        }
          
      
          d3.select(".map_popover_close").html(
                  "<strong>Rank:</strong> <span style='color:black'>"
                  + rank + "</span>"
                  + "<br><strong>Value:</strong> <span style='color:black'>"
                          + datavalue + "</span>");

                          d3.select(".map_popover").style("display","block")
          
          // d3.select(this.parentNode.appendChild(this))
          //         .classed("activehover", true);
  }
  onmousemove(d) {
      d3.select(".map_popover")
        .style("display", "block")
        .style("left", (d3.event.pageX) - 160 + "px")     
        .style("top", (d3.event.pageY - 900) + "px")
        .style("opacity", "1");        
  }
  onmouseout() {
    d3.select(".map_popover").style("display", "none");
    // d3.select(this.parentNode.appendChild(this))
    // .classed("activehover", false);
  }
 
}


