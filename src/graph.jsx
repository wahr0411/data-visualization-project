import React, { Component } from "react"
import * as d3 from "d3"

class Graph extends Component {
    componentWillReceiveProps(props) {
        d3.select("#graph").selectAll("*").remove()//clearing svg
        const graph = props.graph
        
        const classinfo = props.classinfo//classinfo
        const graphSVG = d3.select("#graph")
        const padding = 100
        const width = graphSVG.node().parentNode.clientWidth
        graphSVG.attr("width", width).attr("height", width)
        const simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3.forceLink().id(function(d) {
                    return d.id
                })
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, width / 2))

        simulation.nodes(graph.nodes).on("tick", ticked)
        console.log(graph)
        simulation.force("link").links(graph.links).distance(120)

        //setting scale of stroke-width
        let maxElement = {}
        let minElement = {} 
        maxElement.weight = d3.max(graph.links, n => n.weight)
        minElement.weight = d3.min(graph.links, n => n.weight)
        // maxElement.node = Math.max(graph.nodes.degree)
        // minElement.node = Math.min(graph.nodes.degree)
        const linkScale = d3
                .scaleLinear()
                .domain([minElement.weight, maxElement.weight])
                .range([1,8])
        // const nodeScale = d3
        //         .scaleLinear()
        //         .domain([minElement.node, maxElement.node])
        //         .range([2,10])


        //collecting classinfo
        const classinfoClassname1=[]
        for (const key in classinfo) {
            classinfoClassname1.push(classinfo[key])
        }
        function unique5(arr){
            let x = new Set(arr);
            return [...x];
            }
        const  classinfoClassname = unique5(classinfoClassname1)

        //setting scale of classcolor
        const color = d3.schemeCategory10
        const colorScale = d3.scaleOrdinal()
                    .domain(classinfoClassname)
                    .range(color)
        
        const link = graphSVG
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "#d9dde2")
            .attr("stroke-width",d => linkScale(d.weight))//changing stroke-width according to weight
        
        const node = graphSVG
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            // .attr("r", d => d.degree)
            .attr("fill",d => colorScale(classinfo[d.id]))//dying according to classname

        //lengend
        const length = 10
        const legend = graphSVG
            .append("g")
            .attr("class", "legends")
            .selectAll("legends")
            .data(classinfoClassname)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return i*50
            })
			.attr("y",20)
			.attr("width",length)
			.attr("height",length)
			.attr("fill",d => colorScale(d))
        const legendText = graphSVG
            .append("g")
    		.selectAll("text")
    		.data(classinfoClassname)
    		.enter()
    		.append("text")
    		.text(d => d)
        	.attr("x",function(d,i){
                return i*50
            })
    		.attr("y",50)

        function ticked() {
            let max = {}
            let min = {}
            max.x = d3.max(graph.nodes, n => n.x)
            max.y = d3.max(graph.nodes, n => n.y)
            min.x = d3.min(graph.nodes, n => n.x)
            min.y = d3.min(graph.nodes, n => n.y)
            const xScale = d3
                .scaleLinear()
                .domain([min.x, max.x])
                .range([padding, width - padding])
            const yScale = d3
                .scaleLinear()
                .domain([min.y, max.y])
                .range([padding, width - padding])
            link.attr("x1", function(d) {
                return xScale(d.source.x)
            })
                .attr("y1", function(d) {
                    return yScale(d.source.y)
                })
                .attr("x2", function(d) {
                    return xScale(d.target.x)
                })
                .attr("y2", function(d) {
                    return yScale(d.target.y)
                })
            node.attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
            })
        }
    }
    render() {
        const svg = <svg id="graph" />
        return svg
    }
}

export default Graph
