import { Component, OnInit, Input, Output, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { SpiderChartModel } from '../../models/spider-chart.model';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'sdrc-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpiderChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;

  //@Input() private data: SpiderChartModel;

  @Input() private data: Array<any>;

   private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  
  constructor() { 
   
  }

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

  createChart(d) {
    let element = this.chartContainer.nativeElement;
    d3.select(element).select("svg").remove();
  
    
    var chartData = d;
    var cfg = {
      radius : 5,
      w : 300,
      h : 300,
      factor : 1,
      factorLegend : .85,
      levels : 10,
      maxValue : 0,
      radians : 2 * Math.PI,
      opacityArea : 0.5,
      ToRight : 5,
      TranslateX : 80,
      TranslateY : 30,
      ExtraWidthX : 200,
      ExtraWidthY : 200,
      color : d3.scaleOrdinal(d3.schemeCategory10)
    };
    /*if ('undefined' !== typeof options) {
      for ( var i in options) {
        if ('undefined' !== typeof options[i]) {
          cfg[i] = options[i];
        }
      }
    }*/
    // cfg.maxValue = Math.max(cfg.maxValue,
    // d3.max(d,
    // function(i) {
    // return d3.max(i.map(function(o) {
    // return o.value;
    // }));
    // }));
    cfg.maxValue = 100;
    var allAxis = (d[0].map(function(i, j) {
      return i.axis;
    }));
    var mouseOutcolor = [ "#8FBBD9", "#FFBF87" ];
    var hoverColor = [ "#1F77B4", "#FF8C26" ];

    var total = allAxis.length;
    var radius = cfg.factor
        * Math.min(cfg.w / 2, cfg.h / 2);
    var Format = d3.format('%');
    

    var g = d3.select(element).append("svg").style("overflow", "visible").attr(
        "width", cfg.w + cfg.ExtraWidthX).attr(
        "height", cfg.h + cfg.ExtraWidthY)
        .append("g").attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

    var tooltip;

    // Circular segments
    for (var j = 0; j <= cfg.levels - 1; j++) {
      var levelFactor = cfg.factor * radius
          * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
          .data(allAxis)
          .enter()
          .append("svg:line")
          .attr("x1", function(d, i) {
                return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
              })
          .attr("y1", function(d, i) {
                return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
              })
          .attr("x2", function(d, i) {
                return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
              })
          .attr("y2", function(d, i) {
                return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
              })
          .attr("class", "line")
          .style("stroke", "grey")
          .style("stroke-opacity", "0.75")
          .style("stroke-width", "0.3px")
          .style("stroke-dasharray", 0)
          .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
    }

    // Text indicating at what % each level is
    for (var j = 0; j < cfg.levels; j++) {
      var levelFactor = cfg.factor * radius
          * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
          .data([ 1 ])
          // dummy data
          .enter()
          .append("svg:text")
          .attr("x", function(d) {
                return levelFactor * (1 - cfg.factor * Math.sin(0));
              })
          .attr("y", function(d) {
                return levelFactor * (1 - cfg.factor * Math.cos(0));
              })
          .attr("class", "legend")
          .style("font-family", "sans-serif")
          .style("font-size", "10px")
          .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
          .attr("fill", "#737373")
          .text(Math.round((j + 1) * 100 / cfg.levels));
    }
    var series = 0;

    var axis = g.selectAll(".axis").data(allAxis)
        .enter().append("g").attr("class", "axis");

    axis.append("line")
        .attr("x1", cfg.w / 2)
        .attr("y1", cfg.h / 2)
        .attr("x2", function(d, i) {
              return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
            })
        .attr("y2", function(d, i) {
              return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
        .attr("class", "line")
        .style("stroke", "grey").style("stroke-width", "1px");

    axis.append("text")
        .attr("class", "legend")
        .text(function(d:any) {
          if(d.split(' ').length > 3)
            return d.split(' ').slice(0, 3).join(" ") + " ...";
          else
            return d;
        })
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .attr("text-anchor", "start")
        .attr("dy", "1.5em")
        .attr("transform", function(d, i) {
          return "translate(0, -10)";
        })
        .attr("x",function(d, i) {
              return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i
                          * cfg.radians / total);
            })
        .attr("y",function(d, i) {
              if(d == "J1. New-Born Care Stabilization Unit (NBSU)" && i==7)
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20
                  * Math.cos(i * cfg.radians / total) - 15;
              else
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20
                * Math.cos(i * cfg.radians / total);
            });
    
    d.forEach(function(y, x) {
      var dataValues= [];
          g.selectAll(".nodes")
              .data(y, function(j:any, i):any {
                    dataValues.push([cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue)
                                    * cfg.factor * Math.sin(i * cfg.radians / total)),
                                  cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue)
                                    * cfg.factor * Math.cos(i * cfg.radians / total)) ]);
                  });
          dataValues.push(dataValues[0]);
          g.selectAll(".area")
              .data([ dataValues ])
              .enter()
              .append("polygon")
              .attr("class", "radar-chart-serie" + series)
              .style("stroke-width", "2px")
              .style("stroke", cfg.color(series.toString()))
              .attr("points", function(d) {
                    var str = "";
                    for (var pti = 0; pti < d.length; pti++) {
                      str = str
                          + d[pti][0]
                          + ","
                          + d[pti][1]
                          + " ";
                    }
                    return str;
                  })
              .style( "fill", function(j, i) {
                    return cfg .color(series.toString());
                  })
              .style("fill-opacity", cfg.opacityArea)
              .on('mouseover',
                  function(d) {
                    var z = "polygon." + d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition("200")
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition("200")
                        .style("fill-opacity", .7);
                  })
              .on('mouseout', function() {
                    g.selectAll("polygon")
                        .transition("200")
                        .style("fill-opacity", cfg.opacityArea);
                  });
          series++;
        });
    series = 0;

    d.forEach(function(y, x) {
      var dataValues= [];
          g.selectAll(".nodes")
              .data(y)
              .enter()
              .append("svg:circle")
              .attr("class", "radar-chart-serie" + series)
              .attr('r', cfg.radius)
              .attr("alt", function(j:any) {
                    return Math.max(j.value, 0).toString();
                  })
              .attr("cx", function(j:any, i) {
                    dataValues.push([cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) * cfg.factor
                                    * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) * cfg.factor
                                    * Math.cos(i * cfg.radians / total)) ]);
                    return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue)
                            * cfg.factor  * Math.sin(i * cfg.radians / total));
                  })
              .attr("cy", function(j:any, i) {
                    return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue)
                            * cfg.factor * Math.cos(i * cfg.radians / total));
                  })
              .attr("data-id", function(j:any) {
                    return j.axis;
                  }).attr("ngbPopover", "circle popover")
              .attr("popoverTitle", "Customized popover")
              .style("fill", cfg.color(series.toString()))
              .style("fill-opacity", .9)
              
              .on('mouseover', function(d) {
                    showPopover.call(this, d);
                    d3.select(this).attr('fill', function( d, i) {
                              return hoverColor[i];
                            });
                  }, void function(d:any){
                        var newX = parseFloat(d3.select(this).attr('cx')) - 10;
                        var newY = parseFloat(d3.select(this).attr('cy')) - 5;
                        var z = "polygon." + d3.select(this).attr("class");
                        g.selectAll("polygon").transition("200").style("fill-opacity", 0.1);
                        g.selectAll(z).transition("200").style("fill-opacity", .7);
                  })
              .on('mouseout', function(d) {
                    removePopovers();
                    d3.select(this).attr('fill', function(d, i) {
                              return '#FF0';
                            });
                  });

          series++;
        });

    function removePopovers() {
      $('.popover').each(function() {
        $(this).remove();
      });
    }
    function showPopover(d) {
      $(this).popover({
        title : '',
        placement : 'top',
        container : 'body',
        trigger : 'manual',
        html : true,
        animation: false,
        content : function() {
          return "<div style='color: #257ab6;'>" + d.axis + "</div>" + "Score : " + d.value + "%";
        }
      });
      $(this).popover('show');
      $("body").addClass("popoverOpened");
      // $('.popover.fade.top.in').css('top', parseFloat($('.popover.fade.top.in').css('top').slice(0, -2))+$(window).scrollTop());
    }
  
  }

  updateChart(){

  }
}
