import { Component, OnInit, ViewEncapsulation, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { forEach } from '@angular/router/src/utils/collection';

import { LineChartModel } from '../../models/line-chart.model';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'sdrc-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {

  @ViewChild('linechart') private chartContainer: ElementRef;

//  @Input() private data: LineChartModel[];

  @Input() private data: any;


  constructor() { }

  ngOnInit() {
    if(this.data){
      this.createChart(this.data);
    }
  }

ngOnChanges(changes){
  if(this.data && changes.data.previousValue){
    this.createChart(this.data);
  }
}

createChart(data){
  let el = this.chartContainer.nativeElement;
  d3.select(el).selectAll("*").remove();
  var margin = {
    top : 20,
		right : 15,
		bottom : 60,
		left : 50
  }, width = 550
  if(el.clientWidth > 565)
  var height = 350	- margin.top - margin.bottom;
else
 var height=250- margin.top - margin.bottom;

// set the ranges
// var x = d3.scale.ordinal().rangeRoundBands(
// 		[ 0, width ], 1.0);
// var y = d3.scale.linear().range(
// 		[ height, 0 ]);
// parse the date / time
var x = d3.scaleBand().range([0, width], 1.0);
var y = d3.scaleLinear().rangeRound(
   [ height, 0 ]);

// define the axis
// var xAxis = d3.svg.axis().scale(x).orient("bottom")
// 		.ticks(5);
// var yAxis = d3.svg.axis().scale(y).orient("left")
// 		.ticks(5);
var xAxis = d3.axisBottom().scale(x).ticks(5);
var yAxis = d3.axisLeft().scale(y)
.ticks(5);
// Nest the entries by symbol
var dataNest = d3.nest().key(function(d) {
 return d.key;
}).entries(data);
// // Define the line
// var curveStructure = d3.curveCardinal;
var lineFunctionCardinal = d3.line()
 .defined(function(d) {  return d && d.value!= null; })
 .x(function(d) {
   
   return x(d.date)+width/data.length * dataNest.length / 2;
 }).y(function(d) {
   return y(d.value);
 }).curve(d3.curveCardinal);
var lineFunctionStep = d3.line()
 .defined(function(d) {  return d && d.value!= null; })
 .x(function(d) {
   
   return x(d.date)+width/data.length * dataNest.length / 2;
 }).y(function(d) {
   return y(d.value);
 }).curve(d3.curveStepBefore);
y.domain([ 0, 100 ]);
// Adds the svg canvas
var svg = d3.select(el).append("svg").attr("id",
   "trendsvg").attr("width",
   width + margin.left + margin.right).attr(
   "height",
   height + margin.top + margin.bottom + 200)
   .append("g").attr(
       "transform",
       "translate(" + margin.left + ","
           + (margin.top + 50) + ")").style(
       "fill", "#000");

// Get the data
//					lineData.forEach(function(d) {
//						d.date = d.date;
//						d.value = +d.value;
//					});
x.domain(data.map(function(d) {
 return d.date;
}));
y.domain([ 0, d3.max(data, function(d) {
 return d.value;
}) ]);



// Loop through each symbol / key
//var color = d3.scale.category10(); 
var color = d3.scaleOrdinal().range(
    [ "#386d5c", "#f07258", "#333a3b", "#428ead"]);

//============Text wrap function in x-axis of column chart=====================
function wrap(text, width) {
   text.each(function() {
     var text = d3.select(this),
         words = text.text().split(/\s+/).reverse(),
         word,
         cnt=0,
         line = [],
         lineNumber = 0,
         lineHeight = 1.1, 
         x = text.attr("x"),
         y = text.attr("y"),
         dy = parseFloat(text.attr("dy")),
         tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
     while (word = words.pop()) {
       cnt++;
       line.push(word);
       tspan.text(line.join(" "));
       if (tspan.node().getComputedTextLength() > width) {
         line.pop();
         
         tspan.text(line.join(" "));	
         line = [word];
         if(cnt!=1)
         tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
       }
     }
   });
 }

// Add the X Axis
// svg.append("g").attr("class", "x axis").attr(
// 		"transform", "translate(0," + height + ")")
// 		.call(xAxis).append("text").attr("x",
// 				"405").attr("y",
// 				"45").attr("dx", ".71em")												
// 		.call(wrap, x.bandwidth());

svg.append("g").attr("class", "x axis")
.attr(
   "transform", "translate(0," + height + ")")
   .call(xAxis).append("text").attr("x",
       width).attr("y",
       "65").attr("dx", ".71em")																			
   
   .text("Time Period").style({"fill":
       "#000","text-align":"right", "text-anchor": "end",
     "font-weight": "bold",
     "letter-spacing": "1px"
   });
d3.selectAll(".x.axis .tick text").attr("dx", "-3em").attr("dy",
   "0").attr("transform", function(d) {
 return "rotate(-50)";
}).style({"text-anchor":
"end","font-size":"11px","font-weight":"normal"});

/*if($(window).width()<900){
d3.selectAll(".tick text").style({"text-anchor":
   "end","font-size":"11px","font-weight":"normal"}).attr("dx", "-.3em").attr("dy",
   "1em").attr("transform", function(d) {
 return "rotate(-45)";
});
}
else{
 d3.selectAll(".tick text").style({"text-anchor":
   "end","font-size":"12px","font-weight":"normal","fill":"#333a3b"}).attr("dx", "0").attr("dy",
   "1em").attr("transform", function(d) {
 return "rotate(-45)";
});
 
}*/

// xsvg;
// Add the Y Axis


 svg.selectAll("text");
 svg.append("g").attr("class", "y axis").call(yAxis)
 .append("text").attr("transform",
     "rotate(-90)").attr("y", -50).attr("x", -height/2).attr(
     "dy", ".71em").text("Value")
     .style({"text-anchor":
     "middle", "fill": "#000",
       "font-weight": "bold",
       "letter-spacing": "1px"
     });
// adding multiple lines in Line chart
for (var index = 0; index < dataNest.length; index++) {

 var series = svg.append(
     "g").attr("class", "series tag"+ dataNest[index].key.split(" ")[0]).attr("id",
     "tag" + dataNest[index].key.split(" ")[0]);

 var path = svg.selectAll(".series#tag"+dataNest[index].key.split(" ")[0])
     .append("path")
     .attr("class", "line tag"+dataNest[index].key.split(" ")[0])
     .attr("id", "tag" + dataNest[index].key.split(" ")[0])
     .attr(
         "d",
         function(d) {
           if(dataNest[index].key == "CL")
             return lineFunctionCardinal(dataNest[index].values);
           else
           return lineFunctionStep(dataNest[index].values);
           }).style("stroke", function(d) {
       return color(dataNest[index].key);
     }).style("stroke-width", "2px").style(
         "fill", "none").style("cursor", function(d){
           if(dataNest[index].key == "P-Average")
             return "pointer";
           else
             return "default";
             }).on("mouseover",
                 function(d) {
               if($(this).attr("id") == "tagP-Average")
                 showPopover.call(this, dataNest[3].values[0]);
             }).on("mouseout", function(d) {
           removePopovers();
         });			;
//						 var totalLength = path.node().getTotalLength();
//
//					        path
//					          .attr("stroke-dasharray", totalLength + " " + totalLength)
//					          .attr("stroke-dashoffset", totalLength)
//					          .transition()
//					            .duration(3000)
//					            .ease("linear")
//					            .attr("stroke-dashoffset", 0);
       
       
 svg.selectAll(".series#tag"+dataNest[index].key.split(" ")[0]).select(".point").data(function() {
   return dataNest[index].values;
 }).enter().append("circle").attr("id",
     "tag" + dataNest[index].key.split(" ")[0]).attr(
     "class", function(d){
       if(d.key != "CL" || d.pdsas == "")
         return "point tag"+ dataNest[index].key.split(" ")[0]
       else
         return "point pdsaAvailable tag"+ dataNest[index].key.split(" ")[0]
       }).attr("cx",
     function(d) {
       return x(d.date)+width/data.length * dataNest.length / 2;
     }).attr("cy", function(d) {
   return y(d.value);
 }).attr("r",  function(d) {
   if(d.value!=null && d.key == "CL")
     return "3px";
   else
     return "0px";}).style("fill", function(d) {
   if(d.key != "CL" || d.pdsas == "")
     return color(dataNest[index].key);
   else
     return "#FFC107";
 }).style("stroke", "none").style(
     "stroke-width", "2px").style("cursor", "pointer").on("mouseover",
     function(d) {
       // d3.select(this).moveToFront();
       showPopover.call(this, d);
     }).on("mouseout", function(d) {
   removePopovers();
 });			
 
 // second render pass for the dashed lines
 var left, right
 for (var j = 0; j < dataNest[index].values.length; j += 1) {
     var current = dataNest[index].values[j]
     if (current.value!=null) {
       left = current
     } else {
       // find the next value which is not null
       while (dataNest[index].values[j]!=undefined && dataNest[index].values[j].value == null && j < dataNest[index].values.length) j += 1
       right = dataNest[index].values[j]
       
       if(left!=undefined && right!=undefined && left.key == right.key){
          svg.append("path")
           .attr("id", "tag" + dataNest[index].key)
           .attr("class", "tag" + dataNest[index].key)
           .attr("d", lineFunctionCardinal([left, right]))
             .style("stroke", color(dataNest[index].key))
             .attr('stroke-dasharray', '5, 5').style(
               "fill", "none");
       }
      
         

       j -= 1
     }
   }
 
}
/*
* switch button for series line chart
*/
/*	*/
if(dataNest.length > 1){
 var switchBtn = svg.append("rect").attr("x", width -30)// author
 .attr("y", -64).attr("rx", 0).attr("ry",
     0).attr("width", 30).attr("height", 30)
     .on("click", function() { // ************author:kamal***
       // Determine if current line is
       // visible
       
       rectClickHandler('UCL, #tagLCL', $(this).closest("svg"), d3.select(this), false);
     })
     .style("fill", "none").attr("id", 'rext1').attr(
         "key", "UCL")
     .style({
         "cursor": "pointer",
       });
     
 svg.append("svg:image")
   .attr("xlink:href", '../assets/images/icons/svg_line_Selected.svg')
   .attr("id",  'line_Selected_img1')
   .attr("width", 32)
   .attr("height", 30).attr(
     "key", "UCL")
 .attr("x", width -30)
 .attr("y", -64)
 .style("cursor", "pointer")
 .on("click", function() { // ************author:kamal***
   // Determine if current line is
   // visible
   rectClickHandler('UCL, #tagLCL', $(this).closest("svg"), d3.select(this),false);
 });
     
 var switchBtn2 = svg.append("rect").attr("x", width -80)// author
 .attr("y", -64).attr("rx", 0).attr("ry",
     0).attr("width", 30).attr("height", 30)
     .style("fill", "none").style("cursor", "pointer").attr("id", 'rext1').attr(
       "key", "UCL")
     .on("click", function() { // ************author:kamal***
       // Determine if current line is
       // visible
       rectClickHandler('P-Average', $(this).closest("svg"), d3.select(this), true);
     })
     
     
     ;
 svg.append("svg:image")
   .attr("xlink:href", '../assets/images/icons/svg_median_Selected.svg')
   .attr("id",  'median_Selected_img1')
   .attr("width", 32)
   .attr("height", 30).attr(
     "key", "UCL")
 .attr("x", width -80)
 .attr("y", -64).style("cursor", "pointer").on("click", function() { // ************author:kamal***
   // Determine if current line is
   // visible
   rectClickHandler('P-Average', $(this).closest("svg"), d3.select(this), true);
 })
   
   ;	
}	
svg.append("text").attr("x", width / 2)// author
.attr("y", height + 90).attr("dy", ".3em")
   .text(dataNest[0].values[0].name).call(wrap, width)
   .style({
     //						    	"cursor": "pointer",
                     "fill": "rgb(66, 142, 173)",
                     "font-weight": "bold",
                     "text-anchor": "middle",
                       "font-size": "13px"
                   })
// click handler for hiding series data
function rectClickHandler(series, selectedSvg, button, median) {

 var disName;
 var fillColor;
 if (selectedSvg.find("#tag"+ series)
     .css("display") == "none") {
   disName = "block";
   fillColor = color(series);
   if(median)
     button.attr("xlink:href", '../assets/images/icons/svg_median_Selected.svg');
   else
     button.attr("xlink:href", '../assets/images/icons/svg_line_Selected.svg');
 } else {
   disName = "none";
   if(median)
     button.attr("xlink:href", '../assets/images/icons/svg_median_Selected.svg').attr("id",  'not_median_Selected_img1');
   else
     button.attr("xlink:href", '../assets/images/icons/svg_line_Selected.svg').attr("id",  'not_line_Selected_img1');
   fillColor = "#464646";
 }
 /*svg.selectAll("#" + $(this)[0].id + "").style(
     "fill", fillColor);*/
 selectedSvg.find(".tag"+ series)
 .css("display", disName);
}
function removePopovers() {
 $('.popover').each(function() {
   $(this).remove();
 });
}
function showPopover(d) {
 $(this).popover(
     {
       title : '',
       placement : 'top',
       container : 'body',
       trigger : 'manual',
       html : true,
       animation: false,
       content : function() {
         return d.key == "P-Average" ? "P-Average: <span class='navy-text'>"+d.value : "</span>Time Period: <span class='navy-text'>" + d.date
             + "</span><br/>"+ (d.key == "CL" ? "Fractional Index" : d.key)+": <span class='navy-text'>"
             + d.value +"</span>" + (d.pdsas ? "<br>PDSA:<span class='navy-text'> " + d.pdsas + "</span>":"");
       }
     });
 $(this).popover('show');
 // $('.popover.fade.top.in').css('top', parseFloat($('.popover.fade.top.in').css('top').slice(0, -2)) + $(window).scrollTop());
}
/*//Draw a horizontal line for overall score of latest time period
svg.append("g").attr("class", "y axis").call(yAxis).append("line")          // attach a line
 .style("stroke", "#428ead") 		// colour the line
 .attr("stroke-width", 1)
 .attr("fill", "none")
 .attr("x1", 0)     				// x position of the first end of the line
 .attr("y1", y("30"))      // y position of the first end of the line
 .attr("x2", width)     				// x position of the second end of the line
 .attr("y2", y("30"))
 .style("cursor", "pointer").on("mouseover", function(d) {
 showPopover.call(this, {axis: "", value: Math.round("30")}
       );})    // y position of the second end of the line
.on("mouseout", function() {
removePopovers();
});
*/					d3.selection.prototype.moveToFront = function() {
 return this.each(function(){
     this.parentNode.appendChild(this);
   });
};
d3.selectAll(".domain, .y.axis .tick line").style({"fill": "none", "stroke": "#000"});
d3.selectAll("circle.point").moveToFront();
}
}
