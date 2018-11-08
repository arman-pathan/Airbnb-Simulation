import React, { Component } from "react";
import "./Start.css";
import Jumbo from "./images/resort.jpg";

import { Link } from "react-router-dom";
import cover from "./images/resort.jpg";
import welcome from "./images/welcomeback.jpg";
import Navbar from "./Navbar";
import { Redirect } from "react-router";
import axios from "axios";
import "./Navbar.css";
import cookie from "react-cookies";
import usflag from "./images/usflag.png";
import house from "./images/house.svg";

// var sectionStyle = {
//   backgroundImage: "url(" + { cover } + ")"
// };

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "",
      startdate: "",
      enddate: "",
      accomodates: ""
      //searched: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  handleSearch = e => {
    window.alert("Please login to continue!");
  };
  render() {
    return (
      <div className="coverpic">
        {/* Navbar starts */}

        <div>
          <nav className="navbar navbar-expand-lg navbar-transparent margin">
            <a className="navbar-brand mb-0 h1" href="#">
              <h3>HomeAway &reg; </h3>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li>
                  {" "}
                  <img src={usflag} class="flagcrop" alt="no pic" />{" "}
                </li>

                <li className="nav-item active">
                  <a className="nav-link nav-text" href="#">
                    Trip Boards <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle nav-text"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                  >
                    Login
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item nav-text" to="/loginredux">
                      Traveller Login
                    </Link>
                    <Link
                      className="dropdown-item nav-text"
                      to="/ownerloginredux"
                    >
                      Owner Login
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle nav-text"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                  >
                    Help
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item nav-text" href="#">
                      Visit Help Center
                    </a>
                  </div>
                </li>
                <li>
                  <Link
                    className="btn btn-outline-primary nav-text"
                    to="/OwnerSignUpRedux"
                  >
                    List your property
                  </Link>
                </li>
                <li>
                  {" "}
                  <img src={house} class="housecrop" alt="no pic" />{" "}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Navbar ends */}

        <div className="container-fluid custom">
          {/* <img src={cover} height="700" width="1450" alt="Background" /> */}
          <h5 class="display-6 jumbotron-text cover">
            Book Beaches, houses, cabins,
            <br />
            condos and more worldwide.{" "}
          </h5>

          {/* place search bar form here*/}

          <div className="row search-bar-form-adjust ">
            <form class="form-inline">
              <input
                type="text"
                class="form-control mb-2 mr-sm-2  input-textbox "
                id="country"
                name="country"
                onChange={this.onChange}
                placeholder="Where you going?"
              />

              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">From:</div>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="startdate"
                  name="startdate"
                  placeholder="Start Date"
                  onChange={this.onChange}
                />
              </div>

              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">To:</div>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="enddate"
                  name="enddate"
                  placeholder="End Date"
                  onChange={this.onChange}
                />
              </div>

              <input
                type="text"
                class="form-control mb-2 mr-sm-2"
                id="accomodates"
                name="accomodates"
                placeholder="No. of Guest"
                onChange={this.onChange}
              />

              <button
                onClick={this.handleSearch}
                type="submit"
                class="btn btn-primary md-3  searchbutton"
              >
                Search
              </button>
            </form>
          </div>

          {/* Bottom text*/}

          <div className="container bottom-text-adjust">
            <div className="row bottom-text ">
              <div className="col jumbotron-text">
                <h6>
                  {" "}
                  Your whole vacation starts here Choose a rental from the
                  world's best selection
                </h6>
              </div>

              <div className="col jumbotron-text">
                <h6>
                  {" "}
                  Book and stay with confidence Secure payments, peace of mind
                </h6>
              </div>

              <div className="col jumbotron-text">
                <h6>
                  {" "}
                  Your vacation your way More space, more privacy, no
                  compromises
                </h6>
              </div>
            </div>
          </div>

          {/* Bottom text end*/}
        </div>
      </div>
    );
  }
}
export default Start;
