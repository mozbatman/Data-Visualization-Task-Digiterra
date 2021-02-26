import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component{
    lineRef;

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    componentDidMount() {}
    
    componentWillUnmount() {}

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps){
            if(this.lineRef.chartInstance !== undefined){
                this.lineRef.chartInstance.update(); 
            }    
        }
    }

    render() {
        return(
            <div className="line-data"> 
                <Line data={this.props.data} ref={x => this.lineRef = x}/>  
            </div>
        )
    }
}