import React, { Component } from "react";
import NavbarMain from "./NavbarMain";
import "./SearchProperty.css";
import { Link } from "react-router-dom";
import searchmap from "./images/searchmap.png";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { If } from "react-if";
class SearchPropertyRedux extends Component {
  constructor(props) {
    super(props);

    console.log("Inside constructor");

    console.log("history push data", this.props.location.state);

    const {
      country,
      startdate,
      enddate,
      accomodates
    } = this.props.location.state;

    this.state = {
      country,
      startdate,
      filenames: [],
      // images: [],
      enddate,
      accomodates,
      pageSize: 3,
      currentPage: 1,
      imageView: [],
      price: "",
      bedrooms: ""
      // properties: []
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // componentDidMount() {
  //   const filenames = [];

  //   for (var index = 0; index < this.props.properties.length; index++) {
  //     filenames[index] = this.props.properties[index].images.split(",")[0];
  //   }
  //   console.log("didmount filenames", filenames);
  //   let imagePreview = [];
  //   axios.post("http://18.223.168.84:5000/download/" + filenames).then(response => {
  //     for (var index = 0; index < response.data.length; index++) {
  //       imagePreview[index] = "data:image/jpg;base64, " + response.data[index];
  //     }
  //   });

  //   console.log("after didmount filenames", imagePreview);

  //   this.setState({
  //     imageView: imagePreview
  //   });
  // }

  handlePageChange = page => {
    console.log(page);
    this.setState({
      currentPage: page
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      country: this.state.country,
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      accomodates: this.state.accomodates,
      price: this.state.price,
      bedrooms: this.state.bedrooms
    };

    this.props.ModifySearch(data);
  };

  render() {
    let count = this.props.properties.length;

    const { pageSize, currentPage } = this.state;

    const newproperties = paginate(
      this.props.properties,
      currentPage,
      pageSize
    );

    let alldetails = newproperties.map(property => {
      return (
        <div
          class="media "
          style={{
            margin: "-31% 12% -32% 11%",
            padding: "19%"
          }}
        >
          <div class="media-body " style={{ border: "1px solid" }}>
            <h4 class="card-title p-2 mt-2 ">
              <Link
                to={{
                  pathname: "/fulldetailsredux",
                  state: {
                    property: property,
                    country: this.state.country,
                    startdate: this.state.startdate,
                    enddate: this.state.enddate,
                    accomodates: this.state.accomodates
                  }
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
            <p style={{ "margin-top": "-16%" }}>
              {" "}
              <i class="fa fa-map-marker" /> {property.city} , {property.state},{" "}
              {property.zipcode}, {property.country}{" "}
            </p>
            <p>
              {" "}
              <i class="fa fa-bolt fa-2x" />{" "}
              <span>$ {property.rate} avg/night</span>{" "}
            </p>
            <Link
              class="btn btn-primary bookstyle mb-1 p-1 btn-block"
              to="/FullDetails"
            >
              See more
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div>
        <NavbarMain />
        <div className="row search-bar-form-adjust searchbar">
          <form class="form-inline">
            <input
              type="text"
              class="form-control mb-2 mr-sm-2  input-textbox "
              id="country"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              placeholder="Where do you want to go?"
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
                value={this.state.startdate}
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
                value={this.state.enddate}
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
              value={this.state.accomodates}
            />

            <button
              onClick={this.handleSubmit}
              type="submit"
              class="btn btn-primary md-3 searchbutton"
            >
              Filter
            </button>
          </form>
        </div>
        {/* pagination */}
        {/* filter */}
        <div>
          <label for="price">Price:</label> <span style={{ padding: "0.5%" }} />
          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="500"
            onChange={this.onChange}
            value={this.state.price}
          />
          <span style={{ padding: "0.5%" }}> {this.state.price} </span>
          <span style={{ padding: "0.5%" }} />
          <label for="bedrooms">Bedrooms:</label>{" "}
          <span style={{ padding: "0.5%" }} />
          <input
            type="range"
            id="bedrooms"
            name="bedrooms"
            min="0"
            max="5"
            step="1"
            onChange={this.onChange}
            value={this.state.bedrooms}
          />
          <span style={{ padding: "0.5%" }}>{this.state.bedrooms} </span>
        </div>
        {/* filter */}
        {/* Below search bar*/}
        <br />
        <div className="container" style={{ margin: "10%" }}>
          {/* left */}
          {alldetails}
          {/* <div className="results boxshadow">{alldetails}</div> */}
        </div>
        <div className="pages">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("Inside search details map state to props: ", state);

  return {
    properties: state.reducer.properties
  };
};

const mapDispatchStateToProps = dispatch => {
  console.log("Inside search details map dispatch to props");
  return {
    ModifySearch: data => {
      axios.post("http://18.223.168.84:5000/filter", data).then(response => {
        console.log("INSIDE FILTER ACTION");
        console.log("INSIDE FILTER ACTION", response.data);
        console.log(response.data.result);
        dispatch({
          type: "MODIFY_SEARCH_PROPERTY",
          payload: response.data.result
        });
      });

      console.log("Modify search details/filter Action dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(SearchPropertyRedux);
