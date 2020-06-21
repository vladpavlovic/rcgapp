import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AthleteGuestSelect from "./AthleteGuestSelect";
import Checklist from "./Checklist";
import Paper from "@material-ui/core/Paper";

class Main extends Component {
  componentDidMount() {
    this.props.saveUUID(this.props.match.params.uuid);
    this.props.getAthletes(this.props.match.params.uuid);
  }
  componentDidUpdate() {}

  render() {
    if (!this.props.userData.data) {
      return <div></div>;
    } else if (!this.props.currentUser) {
      return (
        <div>
          <Container className="formBackground" maxWidth="md">
            <Grid container item justify="center" align="center" spacing={3}>
              <Grid item xs={12}>
                <h2>
                  Rose City Gymnastics COVID-19 Daily Wellness Entrance
                  Agreement
                </h2>
              </Grid>
            </Grid>
            <Paper className="paper">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <b>Hello {this.props.userData.data.first_name},</b>
                </Grid>
                <Grid item xs={12}>
                  <AthleteGuestSelect
                    userData={this.props.userData}
                    uuid={this.props.uuid}
                    athletes={this.props.athletes}
                    getAthletes={(uuid) => this.props.getAthletes(uuid)}
                    getAnswers={(answers) => this.props.getAnswers(answers)}
                    setCurrentUser={(current) =>
                      this.props.setCurrentUser(current)
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </div>
      );
    } else
      return (
        <div>
          <Container className="formBackground" maxWidth="md">
            <Grid container item justify="center" align="center" spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <h2>
                    Rose City Gymnastics COVID-19 Daily Wellness Entrance
                    Checklist
                  </h2>
                </Grid>

                <Checklist
                  agreement={this.props.agreement}
                  getAnswers={(answers) => this.props.getAnswers(answers)}
                  currentUser={this.props.currentUser}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      );
  }
}
export default Main;
