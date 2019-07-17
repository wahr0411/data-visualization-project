import React from "react"
import * as d3 from "d3"
import "./App.css"
import { Col, Row } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"
import Degrees from "./degrees"
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {},
            
            graphID:0
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

    changeGraphID = (newGraghID) => {
        this.setState(
            {
                graphID: newGraghID,
                graph: this.state.snapshots[newGraghID].graph
            }
        )
    }

    render() {
        return (
            <div className="App">
                <Row>
                    <Col span={4}>
                        <Row span={12}>
                            <Degrees statisitc = {this.state.snapshots[this.state.graphID] === undefined? null : this.state.snapshots[this.state.graphID].statisitc}/>
                        </Row>
                        <Row span={12}>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Snapshots snapshots={this.state.snapshots} changeGraphID={this.changeGraphID} />
                    </Col>
                    <Col span={10}>
                        <Graph graph={this.state.graph} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default App
