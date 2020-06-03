import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

class Question extends Component {
  renderType = (type) => {
    switch (type) {
      case "boolean":
        return '<p><label>Yes&nbsp</label><input name="agreement" type="radio" value="yes"  />&nbsp&nbsp<label>No&nbsp</label><input name="agreement" type="radio" value="no"  /></p>';
      case "boolean_more1":
        return '<p><label>Yes&nbsp</label><input name="agreement" type="radio" value="yes" />&nbsp&nbsp<label>No&nbsp</label><input name="agreement" type="radio" value="no"  /></p>';
      case "temperature":
        return '<p><label><p>Temperature:</p> <input name="temp" type="text" value="" size="5" /></label> <input name="unit" type="radio" value="degC" /><label>&degC</label>&nbsp<input name="unit" type="radio" value="degF"  /><label>&degF</label> </p>';
      default:
        return "";
    }
  };

  submitHandler = () => {};

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.agreement.questions.map((item, i) => (
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.question,
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.renderType(item.question_type),
                }}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} align="left">
          If you answer yes to any of the questions or have a fever{" "}
          <b>DO NOT</b> come to Rose City Gymnastics Club
        </Grid>
        <Grid item xs={12} align="right">
          <input type="submit" value="Submit" />
        </Grid>
      </form>
    );
  }
}

export default Question;
