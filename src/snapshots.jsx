import React, { Component } from "react"
import * as d3 from "d3"

class Snapshots extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {
        const snapshots = props.snapshots
        const snapshotSVG = d3.select("#snapshot")
        const padding = 100
        const width = snapshotSVG.node().parentNode.clientWidth
        snapshotSVG.attr("width", width).attr("height", width)
        
        const max = {}
        const min = {}
        max.x = d3.max(snapshots, snpst => snpst.vector[0])
        max.y = d3.max(snapshots, snpst => snpst.vector[1])
        min.x = d3.min(snapshots, snpst => snpst.vector[0])
        min.y = d3.min(snapshots, snpst => snpst.vector[1])
        const xScale = d3
            .scaleLinear()
            .domain([min.x, max.x])
            .range([padding, width - padding])
        const yScale = d3
            .scaleLinear()
            .domain([min.y, max.y])
            .range([padding, width - padding])

        const snapshotLinkData = []
        for (let i = 0; i < snapshots.length - 1; i++) {
            snapshotLinkData.push([
                snapshots[i].vector,
                snapshots[i + 1].vector
            ])
        }
        const snapshotLink = snapshotSVG
            .selectAll("line")
            .data(snapshotLinkData)
        snapshotLink.exit().remove()
        snapshotLink
            .enter()
            .append("line")
            .attr("x1", d => xScale(d[0][0]))
            .attr("x2", d => xScale(d[1][0]))
            .attr("y1", d => yScale(d[0][1]))
            .attr("y2", d => yScale(d[1][1]))
            .attr("stroke", "#d9dde2")
            .attr("stroke-width", 3)

        // //setting interpolate for all
        // var a = d3.rgb(237,248,177);
        // var b = d3.rgb(44,127,184);
        // var compute = d3.interpolate(a, b)
        // var linear = d3.scaleLinear()
        //     .domain([0, snapshots.length - 1])
        //     .range([0, 1])

        //setting interpolate each day
        var a = d3.rgb(237,248,177);
        var b = d3.rgb(44,127,184);
        var compute = d3.interpolate(a, b)
        var linear = d3.scaleLinear()
            .domain([0, (snapshots.length - 1)/7])
            .range([0, 1])

        const points = snapshotSVG.selectAll("circle").data(snapshots)
        points.exit().remove()
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.vector[0]))
            .attr("cy", d => yScale(d.vector[1]))
            .attr("r", 5)
            .attr("fill", d => {
                // return compute(linear(snapshots.indexOf(d) - 1))//changing color according to all
                return compute(linear((snapshots.indexOf(d) - 1)%((snapshots.length - 1)/7)))//changing color everyday
            })
            .attr("stroke", "#d9dde2")
            .on("mouseover", (d, i) => {
                console.log(d, i)
            })
            .on("click", function (d, i) {
                props.changeGraphID(i)
            })//shifting graph

            //setting color gradiant
            var defs = snapshotSVG.append("defs");
            var linearGradient = defs.append("linearGradient")
                .attr("id","linearColor")
                .attr("x1","0%")
                .attr("y1","0%")
                .attr("x2","100%")
                .attr("y2","0%");
            var stop1 = linearGradient.append("stop")
                .attr("offset","0%")
                .style("stop-color",a.toString());
            var stop2 = linearGradient.append("stop")
                .attr("offset","100%")
                .style("stop-color",b.toString());
            //adding rect
            var colorRect = snapshotSVG.append("rect")
				.attr("x", 15)
				.attr("y", 20)
				.attr("width", 200)
				.attr("height", 10)
				.style("fill","url(#" + linearGradient.attr("id") + ")");
    }
    render() {
        return <svg id="snapshot" />
    }
}

export default Snapshots