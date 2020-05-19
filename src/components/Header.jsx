import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../App.css";

class Header extends Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <img
            className="banner center-align"
            src="../img/rcg-logo.png"
            alt="Rose City Gymnastics"
          />
        </Grid>
      </Grid>
    );
  }
}

export default Header;
