import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { DonutChartModel } from '../../models/donut-chart.model';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'sdrc-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild('donutChart') private chartContainer: ElementRef;
  @Input() private data: DonutChartModel;

  constructor() { }

  ngOnInit() {
    if(this.data){
      this.createChart(this.data);
    }
  }

  createChart(data){
    // console.log('data');
     let el = this.chartContainer.nativeElement;     
 
       var text = "";      
       var width = 260;
       var height = 260;
       var thickness = 40;
            
       var radius = Math.min(width, height) / 2;
       var color = d3.scaleOrdinal(d3.schemeCategory10);
       
       var svg = d3.select(el)
       .append('svg')    
       .attr('width', width)
       .attr('height', height);
       
       var g = svg.append('g')
       .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
       
       var arc = d3.arc()
       .innerRadius(radius - thickness)
       .outerRadius(radius);
       
       var pie = d3.pie()
       .value(function(d) { return d.value; })
       .sort(null);
       
       var path = g.selectAll('path')
       .data(pie(data))
       .enter()
       .append("g")
       .on("mouseover", function(d) {
             let g = d3.select(this)
               .style("cursor", "pointer")
               .style("fill", "black")
               .append("g")
               .attr("class", "text-group");
        
             g.append("text")
               .attr("class", "name-text")
               .text(`${d.data.label}`)
               .attr('text-anchor', 'middle')
               .attr('dy', '-1.2em');
         
             g.append("text")
               .attr("class", "value-text")
               .text(`${d.data.value}`)
               .attr('text-anchor', 'middle')
               .attr('dy', '.6em');
           })
         .on("mouseout", function(d) {
             d3.select(this)
               .style("cursor", "none")  
               .style("fill", color(this._current))
               .select(".text-group").remove();
           })
         .append('path')
         .attr('d', arc)
         .attr('fill', (d,i) => color(i))
         .on("mouseover", function(d) {
             d3.select(this)     
               .style("cursor", "pointer")
               .style("fill", "grey");
           })
         .on("mouseout", function(d) {
             d3.select(this)
               .style("cursor", "none")  
               .style("fill", color(this._current));
           })
         .each(function(d, i) { this._current = i; });
             
       g.append('text')
         .attr('text-anchor', 'middle')
         .attr('dy', '.35em')
         .text(text);
         }  

}
