import React, { Component } from "react"
import * as d3 from "d3"

class Degrees extends Component {
    componentWillReceiveProps(props) {

        d3.select("#degrees").selectAll("*").remove()

        const degreesSVG = d3.select("#degrees").attr("width", 250).attr("height", 250)
        const statisitc = this.props.statisitc

        const margin = { top: 30, right: 30, bottom: 30, left: 30 }
        // const width = +degreesSVG.attr("width") - margin.left - margin.right,
        //     height = +degreesSVG.attr("height") - margin.top - margin.bottom,
        //     labelPadding = 3;
        const width = degreesSVG.attr("width")
        const height = degreesSVG.attr("height")
        const statisitcIndex = []
        const statisitcDegree = []
        const data = []
        const xTicks = ['1-1','2-3','4-7','8-15','16-31','32-63','64-127','128-255']
        
        for (const key in statisitc) {
            statisitcIndex.push(parseInt(key))
            statisitcDegree.push(statisitc[key])
        }
        for (const key in statisitc) {
            data.push(
                {
                    Index: parseInt(key),
                    Degree: statisitc[key]
                }
            )
        }
        
        
        const x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.Index))
        .range([margin.left, width - margin.right])

        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Degree)]).nice()
        .range([height - margin.bottom, margin.top])
        const xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        const yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y))
        const area = d3.area()
            .x(d => x(d.Index))
            .y0(y(0))
            .y1(d => y(d.Degree)) 
               
        degreesSVG.attr("viewBox", [0, 0, width, height]);
  
        degreesSVG.append("path")
        .datum(data)
        .attr("fill", "steelblue")
        .attr("d", area);
  
        degreesSVG.append("g")
        .call(xAxis);
  
        degreesSVG.append("g")
        .call(yAxis);
  
    

        // const x = d3.scaleBand()
        //     .domain(statisitcIndex)
        //     .range([0, width - margin.left - margin.right])

        // const y = d3.scaleLinear()
        //     .domain([0, d3.max(statisitcDegree)])
        //     .range([height - margin.top - margin.bottom, 0])
    
        // const g = degreesSVG.append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // g.append("g")
        //     .attr("class", "axis axis--x")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));

        // g.append("g")
        //     .attr("class", "axis axis--y")
        //     .call(d3.axisLeft(y));

        
        // const serie = g.selectAll(".serie")
        // .data(data)
        // .enter().append("g")
        // .attr("class", "serie");
  
        // serie.append("path")
        // .attr("class", "line")
        // .style("stroke", "steelblue")
        // .attr("d", d3.line()
        //     .x(function(d) { return x(d.Index); })
        //     .y(function(d) { return y(d.Degree); }));

        // const label = path.selectAll(".label")
        //     .data(function (d) { return d; })
        //     .enter().append("g")
        //     .attr("class", "label")
        //     .attr("transform", function (d, i) { return "translate(" + x(d.Index) + "," + y(d.Degree) + ")"; });
        // label.append("text")
        //     .attr("dy", ".35em")
        //     .text(function (d) { return d.Degree; })
        //     .filter(function (d, i) { return i === data.length - 1; })
        //     .append("tspan")
        //     .attr("class", "label-key")
        //     .text(function (d) { return " " + d.Index; });
        // label.append("rect", "text")
        //     .datum(function () { return this.nextSibling.getBBox(); })
        //     .attr("x", function (d) { return d.x - labelPadding; })
        //     .attr("y", function (d) { return d.y - labelPadding; })
        //     .attr("width", function (d) { return d.width + 2 * labelPadding; })
        //     .attr("height", function (d) { return d.height + 2 * labelPadding; });

    }
    render() {

        const degrees = <svg id="degrees" />
        return degrees

    }
}




export default Degrees