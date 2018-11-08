import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchownerlogin } from "../actions";
import "./Login.css";
import Navbar from "./Navbar";

class OwnerLoginRedux extends Component {
  //Define component that you wanbt to render
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group box1${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        {/* <label >{field.label}</label> */}
        <input
          className="form-control"
          type="text"
          placeholder={field.label}
          {...field.input}
        />
        <div style={{ color: "red" }} className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderFieldPassword(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group box2${touched && error ? "has-danger" : ""}`;
    const hasError = touched && error !== undefined;
    return (
      <div className={className}>
        {/* <label>{field.label}</label> */}
        <input
          error={hasError}
          placeholder={field.label}
          className="form-control"
          type="password"
          {...field.input}
        />
        <div style={{ color: "red" }} className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  /*Action call
  Whenever onSubmit event is triggered, execute an action call called createBook 
  */
  onSubmit(values) {
    console.log(values);

    console.log("VALUES USERNAME", values.username);
    this.props.fetchownerlogin(values, res => {
      console.log(res);

      window.localStorage.setItem("owner", values.username);
      window.localStorage.setItem("user", null);
      window.localStorage.setItem("username", res.data.token);

      this.props.history.push("/homeownerredux");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Navbar />

        <div className="container-fluid maincontainer">
          <h1 className="display-6 middletext">Log in to HomeAway</h1>
          <p className="lead">
            Need an account?{" "}
            <Link to="/ownersignupredux" role="button">
              {" "}
              Sign Up
            </Link>
          </p>
          {/* handleSubmit is the method that comes from redux and it tells redux
        what to do with the submitted form data Field is a component of redux
      that does the wiring of inputs to the redux store. */}
          <div className="loginform">
            <h2> Property Owner Login </h2>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Enter Username"
                name="username"
                component={this.renderField}
              />

              <Field
                label="Enter Password"
                name="password"
                component={this.renderFieldPassword}
              />

              <button type="submit" className="btn loginbutton">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Username cannot be blank";
  }
  if (!values.password) {
    errors.password = "Password cannot be blank";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

// const mapStateToProps = state => ({
//   data: state.form.data
// });

// export default reduxForm({
//   // validate,
//   form: "NewBookForm"
// })(
//   connect(
//     mapStateToProps,
//     { fetchlogin }
//   )(LoginRedux)
// );

export default reduxForm({
  validate,
  form: "NewBookForm"
})(
  connect(
    null,
    { fetchownerlogin }
  )(OwnerLoginRedux)
);
