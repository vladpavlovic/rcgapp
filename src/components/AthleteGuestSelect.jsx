import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../App.css";
import Button from "@material-ui/core/Button";

class AthleteGuestSelect extends Component {
  handleInputChange = (currentUUID) => {
    this.props.setCurrentUser(currentUUID);
  };

  render() {
    if (!this.props.athletes) {
      return <div></div>;
    }
    let check = this.props.athletes.filter(
      (item, i) => item.signed_today === false
    );

    if (check.length === 0) {
      return (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <p>
                You do not have any athletes/volunteers scheduled for today. If
                you are scheduled to volunteer or have an athlete that is
                training today, but not shown, please contact Rose City
                Gymnastics. Thank you.
              </p>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Who would you like to check-in today?
          </Grid>
        </Grid>

        <form>
          <Grid align="center">
            {this.props.athletes
              .filter((item, i) => item.signed_today === false)
              .map((item, i) => (
                <Grid item xs={12}>
                  <Button
                    name="whichAthlete"
                    className="button"
                    variant="contained"
                    onClick={() => this.handleInputChange(item)}
                  >
                    {item.first_name}&nbsp;
                    {item.last_name}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </form>
      </div>
    );
  }
}

export default AthleteGuestSelect;
