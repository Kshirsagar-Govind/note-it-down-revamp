import React, { Component } from "react";

class LoaderLogo extends Component {
  render() {
    return (
      <div className="lds-ellipsis">
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
      </div>
    );
  }
}

export default LoaderLogo;
