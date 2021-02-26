import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default class Header extends Component{
    constructor(props) {
        super(props);
    
        this.state = {}
    }

    componentDidMount() {}
    
    componentWillUnmount() {}

    componentDidUpdate(prevProps, prevState) {}

    render() {
        return(
            <div className="header">
                <div className="title">Data Visualization Task | Digiterra</div> 
                <div className="owner">
                    Created by Mustafa ÖZBATMAN
                    <a className="icon" href="https://www.linkedin.com/in/mustafaozbatman/"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
            </div>
        )
    }
}