import React, { Component } from "react";

class Form extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.saveUUID(this.props.match.params.uuid);
    console.log(this.props.userData);
  }
  componentDidUpdate() {
    console.log(this.props.userData.data);
  }

  render() {
    if (!this.props.userData.data) {
      return <div></div>;
    }
    return <div>Hello {this.props.userData.data.first_name}</div>;
  }
}
export default Form;
