import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AthleteGuestSelect from "./AthleteGuestSelect";
import Checklist from "./Checklist";

class Main extends Component {
  componentDidMount() {
    this.props.saveUUID(this.props.match.params.uuid);
  }
  componentDidUpdate() {
    console.log(this.props.userData.data);
  }

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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                Hello {this.props.userData.data.first_name},
              </Grid>
              <Grid item xs={12}>
                <AthleteGuestSelect
                  userData={this.props.userData}
                  athletes={this.props.userData.data.athletes}
                  setCurrentUser={(current) =>
                    this.props.setCurrentUser(current)
                  }
                />
              </Grid>
            </Grid>
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

                <Checklist agreement={this.props.agreement} />
              </Grid>
            </Grid>
          </Container>
        </div>
      );
  }
}
export default Main;
