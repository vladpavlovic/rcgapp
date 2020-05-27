import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AthleteGuestSelect from "./AthleteGuestSelect";

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
    return (
      <div>
        <Container className="formBackground" maxWidth="md">
          <Grid container item justify="center" align="center" spacing={3}>
            <Grid item xs={12}>
              <h2>
                Rose City Gymnastics COVID-19 Daily Wellness Entrance Checklist
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
                setCurrentUser={current => this.props.setCurrentUser(current)}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default Form;
