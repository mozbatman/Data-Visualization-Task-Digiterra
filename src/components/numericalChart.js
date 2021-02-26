import React, { Component } from "react";

export default class LineChart extends Component{
    lineRef;

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    componentDidMount() {}
    
    componentWillUnmount() {}

    componentDidUpdate(prevProps, prevState) {}

    render() {
        return(
            <div className="numerical-data">
                <p className="text">{this.props.title}</p>
                <div className="data">
                    <div>{this.props.data}</div>
                </div>
            </div>
        )
    }
}