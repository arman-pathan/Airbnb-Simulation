import React, { Component } from "react";
import NavbarMain from "./NavbarMain";
import "./OwnerDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import NavbarMainOwner from "./NavbarMainOwner";

class TravellerDashboardRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: window.localStorage.getItem("user")
    };
  }

  componentDidMount() {
    this.props.TravellerDashboard(this.state.username);
  }

  render() {
    let alldetails = this.props.properties.map(property => {
      return (
        <div class="media ">
          <div class="media-body">
            <h4 class="card-title p-2 mt-2 ">
              <Link
                to={{
                  pathname: "/travellerdashboardredux"
                }}
                role="button"
              >
                {property.headline}
              </Link>
            </h4>
            <p class="card-text styledescription">
              <span>
                {" "}
                <i class="fa fa-home" /> {property.propertytype}{" "}
              </span>
              <span>
                {" "}
                <i class="fa fa-bed" /> {property.bedrooms}{" "}
              </span>
              <span>
                {" "}
                <i class="fa fa-bath" /> {property.bathrooms}{" "}
              </span>
              <span>
                {" "}
                <i class="fa fa-user" /> Sleeps: {property.stay}{" "}
              </span>
            </p>
            <br />
            <p>
              {" "}
              <i class="fa fa-map-marker" /> {property.city} , {property.state},{" "}
              {property.zipcode}, {property.country}{" "}
            </p>
            <p>
              {" "}
              <i class="fa fa-bolt fa" />{" "}
              <span>$ {property.rate} avg/night</span>{" "}
            </p>
          </div>
        </div>
      );
    });
    console.log(this.state.listproperties);
    return (
      <div className="div">
        <NavbarMain />

        {/* Below search bar*/}
        <br />
        <div className="container">
          {/* left */}

          <div className="results boxshadow">
            {" "}
            {this.props.properties.length === 0 ? (
              <div style={{ padding: "20%" }}>
                {" "}
                <p> Nothing to show here. </p>
                <p>
                  {" "}
                  Why don't you go and book some properties{" "}
                  <a href="/homeredux"> here. </a>{" "}
                </p>
              </div>
            ) : (
              alldetails
            )}
          </div>
          {/* right */}
          <div className="sideimage" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "Inside  TRAVELLER_DASHBOARD state to props: ",
    state.reducer.properties
  );

  return {
    properties: state.reducer.properties
  };
};
const mapDispatchStateToProps = dispatch => {
  console.log("Inside TRAVELLER_DASHBOARD map dispatch to props");
  return {
    TravellerDashboard: username => {
      axios
        .get(`http://18.223.168.84:5000/travellerproperties/${username}`)
        .then(response => {
          console.log(response.data);
          console.log(response.data.updatedList);
          dispatch({
            type: "TRAVELLER_DASHBOARD",
            payload: response.data.updatedList
          });
        });

      console.log("TRAVELLER_DASHBOARD Action dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(TravellerDashboardRedux);
