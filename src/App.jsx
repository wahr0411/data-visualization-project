import React from "react"
import * as d3 from "d3"
import "../node_modules/antd/dist/antd.css"
import { Col, Row } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"
import Degrees from "./degrees"
import Controlpanel from "./controlpanel"
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {}, 
            graphID: undefined,
            classinfo:{}
        }
        
    }

    componentDidMount() {
        d3.json("./snapshots-highschool-pca.json").then(snapshots => {
            this.setState({
                snapshots: snapshots,
                graph: snapshots[0].graph,
                graphID: 0
            })
        }).then(()=>{
            // reading classinfo after former files
            d3.json("./id-class.json").then(classinfo => {
                this.setState({
                    classinfo: classinfo
                })
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
        console.log(this.state);
    }

    render() {
        return (
            <div className="App">
                <Row>
                    <Col span={4}>
                        <Row span={8}>
                            <Degrees snapshots={this.state.snapshots} graphID={this.state.graphID} />
                        </Row>
                        <Row span={12}>
                            <Controlpanel />
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Snapshots snapshots={this.state.snapshots} changeGraphID={this.changeGraphID} />
                    </Col>
                    <Col span={10}>
                        <Graph graph={this.state.graph} classinfo={this.state.classinfo}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default App
