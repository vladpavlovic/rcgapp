import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "typeface-roboto";
import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import Main from "./components/Main";

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
    let __uuid = formUUID;

    this.setState(
      {
        uuid: __uuid,
      },
      () => this.getForm(this.state.uuid)
    );
  };
  getAthletes = (uuid) => {
    axios
      .get(`https://rcgcovidapi.lypan.com/parents/${uuid}?today=1&unsigned=1`)
      .then((response) => {
        let __athletes = response.data.athletes;

        this.setState(
          {
            athletes: __athletes,
          }
        );
      });
  };
  getForm = (uuid) => {
    axios
      .get(`https://rcgcovidapi.lypan.com/parents/${uuid}`)
      .then((response) => {
        let __userData = response;

        this.setState(
          {
            userData: __userData,
          }
        );
      });
  };

  setCurrentUser = (current) => {
    let __currentUser = current;

    this.setState(
      {
        currentUser: __currentUser,
      }
    );
  };

  getAgreement = () =>
    axios.get("https://rcgcovidapi.lypan.com/agreements").then((response) => {
      let __agreement = response.data._embedded.items[0];

      let __agreementUUID = __agreement.uuid;
      this.setState(
        {
          agreement: __agreement,
          agreementUUID: __agreementUUID,
        }
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

    this.setState(
      {
        completed: __completedAnswers,
      },
      () => this.assembleAgreement(this.state.completed)
    );
  };

  assembleAgreement = (completed) => {
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
    axios
      .post(
        `https://rcgcovidapi.lypan.com/athletes/${this.state.currentUser.uuid}/agreements/${this.state.agreementUUID}/actions/sign`,
        signedAgreement,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.data.training_status === false) {
          swal({
            title: "Not approved for training",
            text: response.data.message,
            icon: "error",
            button: "Close",
          }).then(() => {
            window.location.reload(true);
          });
        } else {
          swal({
            title: "Approved for training",
            text: response.data.message,
            icon: "success",
            button: "Close",
          }).then(() => {
            window.location.reload(true);
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        swal({
          title: "Oops, something went wrong!",
          text: error.response.data.message,
          icon: "warning",
          button: "Close",
        });
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
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                window.location = "http://www.rosecitygymnastics.com";
                return null;
              }}
            />
            <Route
              path="/:uuid"
              render={(props) => (
                <Main
                  saveUUID={(uuid) => this.saveUUID(uuid)}
                  uuid={this.state.uuid}
                  userData={this.state.userData}
                  athletes={this.state.athletes}
                  agreementUUID={this.state.agreementUUID}
                  signedAgreement={this.state.signedAgreement}
                  currentUser={this.state.currentUser}
                  setCurrentUser={(current) => this.setCurrentUser(current)}
                  getAnswers={(answers) => this.getAnswers(answers)}
                  assembleAgreement={(completed) =>
                    this.assembleAgreement(completed)
                  }
                  getAthletes={(uuid) => this.getAthletes(uuid)}
                  submitAgreement={(agreementUUID) =>
                    this.submitAgreement(agreementUUID)
                  }
                  agreement={this.state.agreement}
                  {...props}
                />
              )}
            />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
