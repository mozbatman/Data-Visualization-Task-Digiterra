import React, { Component } from "react";
import MainContainer from "../containers/MainContainer";
import Header from "../components/header";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div className="main-page">
        <div className="container">
          <Header/>
          <MainContainer></MainContainer>
        </div>
      </div>
    );
  }
}

export default MainPage;