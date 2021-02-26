import React, { Component } from "react";
import { Pie } from 'react-chartjs-2';

export default class PieChart extends Component{
    constructor(props) {
        super(props);
    
        this.state = {}
    }

    componentDidMount() {}
    
    componentWillUnmount() {}

    componentDidUpdate(prevProps, prevState) {}

    render() {
        return(
            <div className="pie-data">
                <Pie data={this.props.clientStatuse}/>
            </div>
        )
    }
}