import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "typeface-roboto";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import Main from "./components/Main";
import AthleteGuestSelect from "./components/AthleteGuestSelect";
import { ConsoleWriter } from "istanbul-lib-report";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: undefined,
      athletes: [],
      userData: [],
      currentUser: null,
      agreement: [],
    };
  }

  componentDidMount() {
    this.getAgreement();
  }
  saveUUID = (formUUID) => {
    console.log("This is the form UUID" + formUUID);
    let __uuid = formUUID;

    this.setState(
      {
        uuid: __uuid,
      },
      () => this.getForm(this.state.uuid)
    );
  };

  getForm = (uuid) => {
    console.log("I am here" + this.state.uuid);
    axios
      .get(`http://rcgcovidapi.lypan.com/parents/${uuid}`)
      .then((response) => {
        let __userData = response;
        console.log(response);
        this.setState(
          {
            userData: __userData,
          },
          () => console.log(this.state.userData)
        );
      });
  };

  setCurrentUser = (current) => {
    let __currentUser = current;
    this.setState(
      {
        currentUser: __currentUser,
      },
      () => console.log("blah")
    );
  };

  getAgreement = () =>
    axios.get("http://rcgcovidapi.lypan.com/agreements").then((response) => {
      let __agreement = response.data._embedded.items[0];
      this.setState(
        {
          agreement: __agreement,
        },
        () => console.log(this.state.agreement)
      );
    });

  render() {
    return (
      <div className="background">
        <Grid container spacing={3}>
          <Grid item xs={12} className="header">
            <Header />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Route
            path="/:uuid"
            render={(props) => (
              <Main
                saveUUID={(uuid) => this.saveUUID(uuid)}
                userData={this.state.userData}
                athletes={this.state.athletes}
                currentUser={this.state.currentUser}
                setCurrentUser={(current) => this.setCurrentUser(current)}
                agreement={this.state.agreement}
                {...props}
              />
            )}
          />
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
