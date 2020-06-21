import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Question from "./Question";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "../App.css";

class Checklist extends Component {
  render() {
    if (!this.props.agreement.questions) {
      return <div></div>;
    }

    return (
      <Container className="formBackground" maxWidth="md">
        <Paper className="paper">
          <Grid container spacing={3}>
            <Grid item xs={0} md={4}></Grid>
            <Grid item xs={7} md={4}>
              <b>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.agreement.title,
                  }}
                />
                for {this.props.currentUser.first_name}{" "}
                {this.props.currentUser.last_name}
              </b>
            </Grid>
            <Grid item xs={3} md={4} align="right" alignItems="baseline">
              <Button
                className="button"
                variant="contained"
                onClick={() => window.location.reload(true)}
              >
                Back
              </Button>
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
