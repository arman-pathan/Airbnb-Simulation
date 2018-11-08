import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions";
import "./SignUp.css";
import Navbar from "./Navbar";

class SignUpRedux extends Component {
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

  renderFieldfirstname(field) {
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

  renderFieldlastname(field) {
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
    this.props.signup(values, () => {
      window.alert("Signed up successfully! Please login to continue");
      this.props.history.push("/loginredux");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Navbar />

        <div className="container-fluid maincontainer">
          <h1 className="display-6 middletext">Create your Account</h1>

          {/* handleSubmit is the method that comes from redux and it tells redux
        what to do with the submitted form data Field is a component of redux
      that does the wiring of inputs to the redux store. */}
          <div className="loginform">
            <p className="lead">Please enter your details below to register </p>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Firstname"
                name="firstname"
                component={this.renderFieldfirstname}
              />

              <Field
                label="Lastname"
                name="lastname"
                component={this.renderFieldlastname}
              />

              <Field
                label="Username"
                name="username"
                component={this.renderField}
              />

              <Field
                label="Password"
                name="password"
                component={this.renderFieldPassword}
              />

              <button type="submit" className="btn loginbutton">
                Sign Me up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// function validate(values) {
//   const errors = {};

//   // Validate the inputs from 'values'
//   if (!values.username) {
//     errors.BookID = "Enter an ID";
//   }
//   if (!values.Title) {
//     errors.Title = "Enter Title";
//   }
//   if (!values.Author) {
//     errors.Author = "Enter Author";
//   }

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.firstname) {
    errors.firstname = "First name cannot be blank";
  }
  if (!values.lastname) {
    errors.lastname = "Last name cannot be blank";
  }
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

export default reduxForm({
  validate,
  form: "NewBookForm"
})(
  connect(
    null,
    { signup }
  )(SignUpRedux)
);
