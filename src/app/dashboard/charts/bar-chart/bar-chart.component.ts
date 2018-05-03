import { Component, OnInit,Input,Output, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { forEach } from '@angular/router/src/utils/collection';

import { BarchartModel } from '../../models/barchart.model';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'sdrc-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.createChart(this.data);
    }
  }

  ngOnChanges(changes) {
    if (this.data && changes.data.previousValue) {
      this.createChart(this.data);
    }
  }
  createChart(data){
    
    let el = this.chartContainer.nativeElement;
    // d3.select(el).remove();
    d3.select(el).select("svg").remove();
    var n = data.length, // number of layers
    m = 10 // number of samples per layer
    // stack = d3.stack(), layers = stack(data),
    // var setLayer = function(arr){
    //   var stack = d3.stack().keys([0]);
    //   stack.value(function (d, key) {
    //       return d[key].y;
    //   });
    //   var layers = stack(data)
    // }
    // data.forEach(el => {
    //   setLayer(el);
    // });
    var layers = data;
    layers.forEach(function(layer, i) {
      layer.forEach(function(el, j) {
        el.y = undefined;
        el.y0 = i;
      });
    });

    var yGroupMax = d3.max(layers, function(layer) {
      return d3.max(layer, function(d) {

        return d.value;
      });
    }), yStackMax = d3.max(layers, function(layer) {
      return d3.max(layer, function(d) {
        return d.y0 + d.value;
      });
    });

  
    var margin = {
      top : 20,
      right : 55,
      bottom : 40, // // bottom height
      left : 40
    }, width = 550, height = 300 // //
        // height
        - margin.top - margin.bottom;
    /*if($(window).width()< 768){
      margin.left = 0;
      margin.right = 0;
    }*/
    // var x = d3.scaleOrdinal().domain(data[0].map(function(d) {
    //   return d.axis;
    // })).rangeRound([0, width]);
    var x = d3.scaleBand().domain(data[0].map(function(d) {
      return d.axis;
    })).range([0, width]).padding(0.1);
    var y = d3.scaleLinear().domain([ 0, 100 ]).rangeRound(
        [ height, 0 ]);

    // var color = d3.scale.linear().domain([ 0, n - 1 ])
    // .range([ "#8FBBD9", "#FFBF87" ]);
    // var color = [ "#8FBBD9", "#FFBF87","#FF8C26" ];
    var color = [ "#1a9641", "#FF8000", "#d7191c" ];

    // var hoverColor = d3.scale.linear().domain([ 0, n - 1 ])
    // .range([ "#1F77B4", "#FF8C26" ]);
    var hoverColor = [ "#017A27", "#FF5900", "#b7191c" ];

    var formatTick = function(d) {
      return d.split(".")[0];
    };
    // var xAxis = d3.svg.axis().scale(x).orient("bottom")
    //     .tickFormat(formatTick);
    var xAxis = d3.axisBottom().scale(x).tickFormat(formatTick);
    // var yAxis = d3.svg.axis().scale(yRange).orient("left");
    var svg = d3.select(el).append("svg").attr("id",
        "columnbarChart").attr("width",
        width + margin.left + margin.right).attr("height",
        height + margin.top + margin.bottom).append("g")
        .attr(
            "transform",
            "translate(" + margin.left + ","
                + margin.top + ")");

    var layer = svg.selectAll(".layer").data(layers).enter()
        .append("g").attr("class", "layer").style("fill",
            function(d, i) {
              return color[i];
            }).attr("id", function(d, i) {
          return i;
        });
    // var layer = svg.selectAll(".layer").data(layers)
    // .enter().append("g").attr("class", "layer").style("fill",
    // function(d, i) {
    // if(80 <= d[i].value ){
    // return color[0];}
    // else if(61 <= d[i].value && d[i].value <= 79 ){
    // return color[1];}
    // else if(d[i].value <= 60 ){
    // return color[2];}
    // }).attr("id", function(d,i) {
    // return i;
    // });
    var rect = layer.selectAll("rect").data(function(d) {
      return d;
    }).enter().append("rect").attr("x", function(d) {
      return x(d.axis);
    }).attr("y", height).attr("width", x.bandwidth()).attr(
        "height", 0).style("fill", function(d, i) {
      if (80 <= d.value) {
        return color[0];
      } else if (60 <= d.value && d.value < 80) {
        return color[1];
      } else if (d.value < 60) {
        return color[2];
      }
    }).on("mouseover", function(d) {
      showPopover.call(this, d);
      // d3.select(this).attr('fill', function(d, i) {
      // return hoverColor[$(this).parent().attr('id')];
      // });
      d3.select(this).style('fill', function(d, i) {

        if (80 <= d.value) {
          return hoverColor[0];
        } else if (60 <= d.value && d.value < 80) {
          return hoverColor[1];
        } else if (d.value < 60) {
          return hoverColor[2];
        }
      });

    }).on("mouseout", function(d) {
      removePopovers();
      // d3.select(this).attr('fill', function(d, i) {
      // return color[$(this).parent().attr('id')];
      // });
      d3.select(this).style('fill', function(d, i) {
        if (80 <= d.value) {
          return color[0];
        } else if (60 <= d.value && d.value < 80) {
          return color[1];
        } else if (d.value < 60) {
          return color[2];
        }
      });
    });
    ;

    svg.append("g").attr("class", "x axis").attr("transform",
        "translate(0," + height + ")").call(xAxis)
        .selectAll("text").style("text-anchor", "end")
        .attr("class",  function(d,i){return  "evmtext"+i})
//							.attr("id", function(d,i){return "chartid"+i})
        .attr("dx", "-.2em").attr("dy", ".70em");
    // start
    // var xAxis = d3.axisBottom()
    // .scale(x);
    var yAxis = d3.axisLeft().scale(y);

    svg.append("g").attr("class", "x axis").attr("transform",
        "translate(0," + height + ")").call(xAxis).attr(
        "x", width / 2).attr("y", margin.bottom).attr("dx",
        "1em").style("text-anchor", "middle").text(
        "Time Period");
    // .style("fill", "#FFFFFF");
    svg.append("g").attr("class", "y axis").call(yAxis).append(
        "text").attr("transform", "rotate(-90)").attr("y",
        0 - margin.left).attr("x", 0 - (height / 2)).attr(
        "dy", "1em").style("text-anchor", "end").text(
        "Score(%)");

    // END
    // legend
    // end of legend
    
    function transitionGrouped() {
      y.domain([ 0, 100 ]);

      rect.transition().duration(500).delay(function(d, i) {
        return i * 10;
      }).attr("x", function(d, i, j) {
        return x(d.axis) + x.bandwidth() / n * d.y0; // function(d)
        // {return
        // x(d.axis);
        // //
        // for
        // Group
        // bar
        // chat
      }).attr("width", x.bandwidth() / n).transition().attr(
          "y", function(d) {
            return y(d.value);
          }).attr("height", function(d) {
        return height - y(d.value);
      });
    }

    transitionGrouped();
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
              if(d.axis != "")
              return "<div style='color: #257ab6;'>" + d.axis + "</div>" + "Score : "
                  + d.value + "%";
              else
                return "<div style='color: #257ab6;'> Average: " + d.value + "%</div>" ;
            }
          });
      $(this).popover('show');
      // $('.popover.fade.top.in').css('top', parseFloat($('.popover.fade.top.in').css('top').slice(0, -2)) + $(window).scrollTop() - 15);
    }
    
    //NEW CODE FOR DATA VALUE TEXT ON EACH BAR-----------------
    var e0Arr = [];
    for (var i = 0; i < data.length; i++) {
      e0Arr.push(data[i][0].value);
      layer.selectAll("evmtext" + i).data(data[i]).enter()
          .append("text").attr(
              "x",
              function(d) {
                return i == 0 ? x(d.axis)
                    + x.bandwidth() / 2 - 9
                    : x(d.axis) + x.bandwidth()
                        / 2 + 12;
              }) // changes acc to no of bars in one
                // chart
          .attr("y", function(d) {
            return y(d.value) - 3;
          }).style("text-anchor", "middle").style("fill",
              "#000000").text(function(d) {
            return Math.round(d.value);
          });
    }
    //END=================
    //calculate average
      // var sumTotal = 0; var avg = 0;
      // for(var i=0; i<data[0].length; i++){
      //   sumTotal = sumTotal+parseFloat(data[0][i].value);
      // }
      // avg = sumTotal/data[0].length;
      // scope.averageScore = Math.round(avg);
    //Draw a horizontal line for overall score of latest time period
      // svg.append("g").attr("class", "y axis").call(yAxis).append("line")          // attach a line
      // .attr("stroke-dasharray", "5,5")
      //   .attr("stroke", "#1F77B4") 		// colour the line
      //   .attr("stroke-width", 2)
      //   .attr("fill", "none")
      //   .attr("x1", 0)     				// x position of the first end of the line
      //   .attr("y1", y(avg.toString()))      // y position of the first end of the line
      //   .attr("x2", width)     				// x position of the second end of the line
      //   .attr("y2", y(avg.toString()))
      //   .style("cursor", "pointer").on("mouseover", function(d) {
      //   showPopover.call(this, {axis: "", value: Math.round(avg.toString())}
      //         );})    // y position of the second end of the line
      // .on("mouseout", function() {
      // removePopovers();});				
  
  }

}