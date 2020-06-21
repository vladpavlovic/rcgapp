import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../App.css";

class Header extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <a href="http://www.rosecitygymnastics.com">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img
                className="banner center-align"
                src="../img/rcg-logo.png"
                alt="Rose City Gymnastics"
              />
            </Grid>
          </Grid>
        </a>
      </Container>
    );
  }
}

export default Header;
