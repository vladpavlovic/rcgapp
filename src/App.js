import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "typeface-roboto";

import Header from "./components/Header";
import Form from "./components/Form";
import { ConsoleWriter } from "istanbul-lib-report";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: undefined,
      athleteUuid: undefined,
      userData: []
    };
  }

  saveUUID = formUUID => {
    console.log("This is the form UUID" + formUUID);
    let __uuid = formUUID;

    this.setState(
      {
        uuid: __uuid
      },
      () => this.getForm(this.state.uuid)
    );
  };

  getForm = uuid => {
    console.log("I am here" + this.state.uuid);
    axios.get(`http://rcgcovidapi.lypan.com/parents/${uuid}`).then(response => {
      let __userData = response;
      console.log(response);
      this.setState(
        {
          userData: __userData
        },
        () => console.log(this.state.userData)
      );
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Route
          path="/:uuid"
          render={props => (
            <Form
              saveUUID={uuid => this.saveUUID(uuid)}
              userData={this.state.userData}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
