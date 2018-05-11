import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import * as d3 from 'd3';
// import * as topojson from 'ts-topojson';
import * as topojson from 'topojson-client';

@Component({
  selector: 'sdrc-thematic-view',
  templateUrl: './thematic-view.component.html',
  styleUrls: ['./thematic-view.component.scss']
})
export class ThematicViewComponent implements OnInit {
  width: any;
  height;
  projection;
  path;
  svg;
  g: any;

  // @Input

  @HostListener('window:resize') onResize() {

    this.width = window.innerWidth
    this.height = window.innerHeight;
    this.projection = d3.geo.mercator();
    this.path = d3.geo.path()
      .projection(this.projection)
      .pointRadius(2);
    d3.selectAll('#map svg').remove();
    this.svg = d3.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
      d3.json("assets/India.json", (error, data) => {
        console.log(data)
        let boundary = this.centerZoom(data);
        let subunits = this.drawSubUnits(data);
        this.colorSubunits(subunits);
        this.drawSubUnitLabels(data);
      });
    this.g = this.svg.append("g");
  }


  constructor() {
  }

  ngOnInit() {
    {
      this.width = window.innerWidth
      this.height = window.innerHeight;
      this.projection = d3.geoMercator();
      this.path = d3.geoPath()
        .projection(this.projection)
        .pointRadius(2);
      this.svg = d3.select("#map").append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
      this.g = this.svg.append("g");
      d3.json("assets/India.json", (error, data) => {
        console.log(data)
        let boundary = this.centerZoom(data);
        let subunits = this.drawSubUnits(data);
        this.colorSubunits(subunits);
        this.drawSubUnitLabels(data);
      });
    }
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

    return o;

  }

  drawOuterBoundary(data, boundary) {

    this.g.append("path")
      .datum(boundary)
      .attr("d", this.path)
      .attr("class", "subunit-boundary")
      .attr("fill", "none")
      .attr("stroke", "#3a403d");

  }

  drawPlaces(data) {

    this.g.append("path")
      .datum(topojson.feature(data, data.objects.places))
      .attr("d", this.path)
      .attr("class", "place");

    this.g.selectAll(".place-label")
      .data(topojson.feature(data, data.objects.places).features)
      .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function (d) {
        return "translate(" + this.projection(d.geometry.coordinates) + ")";
      })
      .attr("dy", ".35em")
      .attr("x", 6)
      .attr("text-anchor", "start")
      .style("font-size", ".7em")
      .style("text-shadow", "0px 0px 2px #fff")
      .text(function (d) {
        return d.properties.name;
      });

  }

  drawSubUnits(data) {

    let subunits = this.g.selectAll(".subunit")
      .data(topojson.feature(data, data.objects.layer1).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("d", this.path)
      .style("stroke", "#fff")
      .style("stroke-width", "1px");

    return subunits;

  }

  drawSubUnitLabels(data) {

    this.g.selectAll(".subunit-label")
      .data(topojson.feature(data, data.objects.layer1).features)
      .enter().append("text")
      .attr("class", "subunit-label")
      .attr("transform", function (d) {
        return "translate(" + this.path.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", ".5em")
      .style("text-shadow", "0px 0px 2px #fff")
      .style("text-transform", "uppercase")
      .text(function (d) {
        return d.properties.NAME1_;
      });

  }

  colorSubunits(subunits) {

    let c = d3.scaleOrdinal(d3.schemeCategory20);
    subunits
      .style("fill", function (d, i) {
        return c(i);
      })
      .style("opacity", ".6");

  }
}


