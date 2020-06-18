import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

class Question extends Component {
  renderType = (item) => {
    console.log(item);
    switch (item.question_type) {
      case "boolean":
        return (
          "<p><label>Yes&nbsp</label><input name=" +
          item.uuid +
          ' type="radio" value="1"  />&nbsp&nbsp<label>No&nbsp</label><input name=' +
          item.uuid +
          ' type="radio" value="0"  /></p>'
        );
      case "boolean_more1":
        return (
          "<p><label>Yes&nbsp</label><input name=" +
          item.uuid +
          ' type="radio" value="1" />&nbsp&nbsp<label>No&nbsp</label><input name=' +
          item.uuid +
          ' type="radio" value="0"  /></p>'
        );
      case "temperature":
        return (
          "<p><label><p>Temperature:</p> <input name=" +
          item.uuid +
          ' type="text" value="" size="5" /></label> <input name="unit" type="radio" value="degC" /><label>&degC</label>&nbsp<input name="unit" type="radio" value="degF"  /><label>&degF</label> </p>'
        );
      default:
        return "";
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = [];
    formData.forEach((value, property) => (answers[property] = value));
    //here you can update, remove, add values/properties in the body object this is specially usefull if any custom process must be done to check, encrypt data or wherever you want.
    console.table(answers);
    // Request goes here.

    this.props.getAnswers(answers);
  };

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
                  __html: this.renderType(item),
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
