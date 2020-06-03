import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Question from "./Question";

class Checklist extends Component {
  render() {
    if (!this.props.agreement.questions) {
      return <div></div>;
    }
    console.log(this.props.agreement.questions);
    return (
      <Container className="formBackground" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.agreement.title,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} justify="left" align="left">
          <Grid item xs={12}>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.agreement.description,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} justify="left" align="left">
          <Grid item xs={12}>
            <Question agreement={this.props.agreement} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Checklist;