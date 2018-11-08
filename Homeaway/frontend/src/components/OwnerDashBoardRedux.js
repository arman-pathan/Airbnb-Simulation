import React, { Component } from "react";
import NavbarMain from "./NavbarMain";
import "./OwnerDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import NavbarMainOwner from "./NavbarMainOwner";

class OwnerDashboardRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: window.localStorage.getItem("owner")
    };

    this.props.OwnerDashboard(this.state.username);
  }

  componentDidMount() {}

  render() {
    console.log("localproperties:", this.props.properties);

    let alldetails = this.props.properties.map(property => {
      return (
        <div style={{ border: "1px solid" }} class="media prop">
          <div class="media-body">
            <h4 class="card-title p-2 mt-2 ">
              <Link
                to={{
                  pathname: "/#"
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
          <hr color="red" />
        </div>
      );
    });
    console.log(this.state.listproperties);
    return (
      <div className="div">
        <NavbarMainOwner />

        {/* Below search bar*/}
        <br />
        <p className="lead">
          Total Properties booked of Owner{" "}
          {window.localStorage.getItem("owner")} :{" "}
        </p>
        <div className="container">
          {/* left */}
          {alldetails}
          {/* right */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "Inside  OWNER DASHBOARD state to props: ",
    state.reducer.properties
  );

  return {
    properties: state.reducer.properties
  };
};
const mapDispatchStateToProps = dispatch => {
  console.log("Inside OWNER DASHBOARD map dispatch to props");
  return {
    OwnerDashboard: username => {
      axios.get(`http://18.223.168.84:5000/${username}`).then(response => {
        console.log(response.data);
        console.log(response.data.updatedList);
        dispatch({
          type: "OWNER_DASHBOARD",
          payload: response.data.updatedList
        });
      });

      console.log("OWNER DASHBOARD Action dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(OwnerDashboardRedux);
