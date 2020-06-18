import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "typeface-roboto";
import swal from "sweetalert";
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
      agreement: {},
      agreementUUID: undefined,
      completed: {},
      signedAgreement: {},
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
    console.log(current);
    this.setState(
      {
        currentUser: __currentUser,
      },
      () => console.log(this.state.currentUser)
    );
  };

  getAgreement = () =>
    axios.get("http://rcgcovidapi.lypan.com/agreements").then((response) => {
      let __agreement = response.data._embedded.items[0];
      let __agreementUUID = __agreement.uuid;
      this.setState(
        {
          agreement: __agreement,
          agreementUUID: __agreementUUID,
        },
        () => console.log(this.state.agreement)
      );
    });

  getAnswers = (answers) => {
    let __completedAnswers = [];

    Object.keys(answers).forEach((answer) => {
      __completedAnswers.push({
        question_uuid: answer,
        value: answers[answer],
      });
    });

    console.log(__completedAnswers);

    this.setState(
      {
        completed: __completedAnswers,
      },
      () => this.assembleAgreement(this.state.completed)
    );
  };

  assembleAgreement = (completed) => {
    console.log("in assembleAgreement");
    console.log(completed);
    let __signedAgreement = {
      parent_uuid: this.state.uuid,
      questions: this.state.completed,
    };
    this.setState(
      {
        signedAgreement: __signedAgreement,
      },
      () => this.submitAgreement(this.state.signedAgreement)
    );
  };

  submitAgreement = (signedAgreement) => {
    console.log(signedAgreement);
    axios
      .post(
        `http://rcgcovidapi.lypan.com/athletes/${this.state.currentUser}/agreements/${this.state.agreementUUID}/actions/sign`,
        signedAgreement,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
        swal(response.data.message);
      });
  };

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
                agreementUUID={this.state.agreementUUID}
                signedAgreement={this.state.signedAgreement}
                currentUser={this.state.currentUser}
                setCurrentUser={(current) => this.setCurrentUser(current)}
                getAnswers={(answers) => this.getAnswers(answers)}
                assembleAgreement={(completed) => this.getAnswers(completed)}
                submitAgreement={(agreementUUID) =>
                  this.submitAgreement(agreementUUID)
                }
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
