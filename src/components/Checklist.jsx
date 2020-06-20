import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Question from "./Question";
import Paper from "@material-ui/core/Paper";
import "../App.css";

class Checklist extends Component {
  render() {
    if (!this.props.agreement.questions) {
      return <div></div>;
    }

    return (
      <Container className="formBackground" maxWidth="md">
        <Paper className="agree">
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
              <Question
                agreement={this.props.agreement}
                getAnswers={(answers) => this.props.getAnswers(answers)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default Checklist;
