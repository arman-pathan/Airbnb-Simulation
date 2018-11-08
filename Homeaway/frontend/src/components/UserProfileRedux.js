import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import NavbarMain from "./NavbarMain";
import NavbarMainOwner from "./NavbarMainOwner";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";

class UserProfileRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: window.localStorage.getItem("user"),
      firstname: "",
      lastname: "",
      aboutme: "",
      city: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      phone: ""
    };

    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.handleAboutMe = this.handleAboutMe.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleSchool = this.handleSchool.bind(this);
    this.handleHometown = this.handleHometown.bind(this);
    this.handleLanguages = this.handleLanguages.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  handleFirstname = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  handleLastname = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  handleAboutMe = e => {
    this.setState({
      aboutme: e.target.value
    });
  };

  handleCity = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleCompany = e => {
    this.setState({
      company: e.target.value
    });
  };

  handleSchool = e => {
    this.setState({
      school: e.target.value
    });
  };

  handleHometown = e => {
    this.setState({
      hometown: e.target.value
    });
  };

  handleLanguages = e => {
    this.setState({
      languages: e.target.value
    });
  };

  handleGender = e => {
    console.log(e.target.value);

    this.setState({
      gender: e.target.value
    });

    console.log(this.state.gender);
  };

  handlePhone = e => {
    this.setState({
      phone: e.target.value
    });
  };

  componentDidMount() {
    axios
      .get(`http://18.223.168.84:5000/user/${this.state.username}`)
      .then(response => {
        console.log(response);

        const {
          firstname,
          lastname,
          aboutme,
          city,
          company,
          school,
          hometown,
          languages,
          gender,
          phone
        } = response.data;

        // console.log(response.data);
        // console.log(response.data.user);
        // console.log(response.data.user.firstname);
        // console.log(response.data.user.lastname);

        this.setState({
          firstname,
          lastname,
          aboutme,
          city,
          company,
          school,
          hometown,
          languages,
          gender,
          phone
        });
      });
  }

  handleProfile = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      aboutme: this.state.aboutme,
      city: this.state.city,
      company: this.state.company,
      school: this.state.school,
      hometown: this.state.hometown,
      languages: this.state.languages,
      gender: this.state.gender,
      phone: this.state.phone
    };

    console.log("Inside handle profile");
    this.props.onUpdateProfile(data);
  };

  render() {
    // let cookieCheck = null;
    // if (!cookie.load("cookie")) {
    //   window.alert("Please login to continue!");
    //   cookieCheck = <Redirect to="/login" />;
    // }
    // console.log("TOKEN: ", localStorage.getItem("username"));

    // if (localStorage.getItem("username")) {
    //   window.alert("Please login to continue!");
    //   var Check = <Redirect to="/loginredux" />;
    // }
    //     var check = false;
    // var check = this.props.updated;

    //     if (check) {
    //       console.log(check);
    //       console.log("Updated profile details successfully");

    //       window.alert("Profile details updated successfully");

    //       return <Redirect to="/homeredux" />;
    //     }

    return (
      <div>
        {/* {Check} */}

        {/* {localStorage.getItem("user") ? <NavbarMain /> : <NavbarMainOwner />} */}

        <NavbarMain />

        {console.log(this.props.updated)}
        <nav id="navbar">
          <div class="container-fluid">
            <ul>
              <li>
                <a href="/messaging">Inbox</a>
              </li>
              <li>
                <a href="#">My trips</a>
              </li>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">Account</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid profilepic">
          <h1 className="display-6 middletext">
            {" "}
            {this.state.firstname} {this.state.lastname}
          </h1>

          <p className="lead">Member since 2018 </p>
        </div>

        <div className="container profile">
          <div className="profileform">
            <h2> Profile details </h2>
            <form>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="First Name"
                  onChange={this.handleFirstname}
                  name="firstname"
                  value={this.state.firstname}
                />
              </div>
              <br />
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Last Name"
                  onChange={this.handleLastname}
                  name="lastname"
                  value={this.state.lastname}
                />
              </div>
              <br />

              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="20"
                  name="aboutme"
                  id="aboutme"
                  style={{ height: 200, width: 500 }}
                  onChange={this.handleAboutMe}
                  placeholder="About me"
                  maxLength="400"
                  value={this.state.aboutme}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City, Country"
                  name="city"
                  onChange={this.handleCity}
                  value={this.state.city}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  placeholder="Company"
                  name="company"
                  onChange={this.handleCompany}
                  value={this.state.company}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="school"
                  placeholder="School"
                  name="school"
                  onChange={this.handleSchool}
                  value={this.state.school}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="hometown"
                  placeholder="HomeTown"
                  name="hometown"
                  onChange={this.handleHometown}
                  value={this.state.hometown}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="languages"
                  placeholder="Languages"
                  name="languages"
                  onChange={this.handleLanguages}
                  value={this.state.languages}
                />
              </div>
              <br />

              <div className="form-group">
                <select
                  name="gender"
                  className="form-control"
                  style={{ width: 100 }}
                  onChange={this.handleGender}
                >
                  <option disabled value>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone: Eg. +1(669)-243-7790"
                  maxLength="14"
                  onChange={this.handlePhone}
                  value={this.state.phone}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  style={{
                    float: "left",
                    margin: "10px 0px 0px 0px",
                    height: "50px",
                    lineheight: "50px"
                  }}
                  onClick={this.handleProfile}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Inside map state to props ");

  return {
    updated: state.reducer.updated
  };
};
const mapDispatchStateToProps = dispatch => {
  return {
    onUpdateProfile: data => {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "username"
      );
      axios.post("http://18.223.168.84:5000/profile", data).then(response => {
        window.alert("Profile details updated successfully");
        dispatch({
          type: "UPDATE_PROFILE",
          payload: response,
          statusCode: response.status
        });
      });

      console.log("Dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(UserProfileRedux);
