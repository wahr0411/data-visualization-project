import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import "./App.css"
import { Col, Row } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {},
        }

    }

    componentDidMount() {
        d3.json("./snapshots-highschool-pca.json").then(snapshots => {
            this.setState({
                snapshots: snapshots,
                graph: snapshots[0].graph
            })
        })
    }

    changeGraph = (newGraghID) => {
        this.setState(
            {
                graph: this.state.snapshots[newGraghID].graph
            }
        )
    }

    render() {

        return (
            <div className="App">
                <Row>
                    <Col span={12}>
                        <Snapshots snapshots={this.state.snapshots} changeGraph={this.changeGraph} />
                    </Col>
                    <Col span={12}>
                        <Graph graph={this.state.graph} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default App
