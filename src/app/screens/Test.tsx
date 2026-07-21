// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
    });
  };

  //* Component Lifecycle Methods
  componentDidMount() {
    // console.log("componentDidMount");
    //* Runs after first render(mount) => RETRIEVE DATA FROM BACKEND SERVER
  }

  componentDidUpdate() {}
  //* Runs right before the component is removed from screen

  componentWillUnmount() {
    // console.log("componentWillUnmount");
    //* Runs before component unmount - Removed from the screen
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
