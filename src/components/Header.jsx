import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../App.css";

class Header extends Component {
  render() {
    return (
      <div className="row header">
        <Grid item xs={12}>
          <img
            className="banner center-align"
            src="../img/rcg-logo.png"
            alt="Rose City Gymnastics"
          />
        </Grid>
      </div>
    );
  }
}

export default Header;
