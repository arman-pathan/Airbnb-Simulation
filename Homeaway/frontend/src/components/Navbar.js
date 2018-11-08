import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import usflag from "./images/usflag.png";
import house from "./images/house.svg";
class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light navbar-color margin">
            <a className="navbar-brand mb-0 h1" href="#">
              <h3>HomeAway &reg; </h3>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
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
                  <a className="nav-link" href="#">
                    Trip Boards <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/loginredux">
                      Traveller Login
                    </Link>
                    <Link className="dropdown-item" to="/ownerloginredux">
                      Owner Login
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Help
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Visit Help Center
                    </a>
                  </div>
                </li>
                <li>
                  <Link
                    className="btn btn-outline-primary"
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
      </div>
    );
  }
}
export default Navbar;
