import React, { Component } from "react";
import "./Property.css";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import NavbarMain from "./NavbarMain";
import NavbarMainOwner from "./NavbarMainOwner";

import "./PropertyNew.css";
class PropertyNewRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: window.localStorage.getItem("owner"),
      country: "",
      street: "",
      building: "",
      city: "",
      state: "",
      zipcode: "",
      headline: "",
      description: "",
      propertytype: "",
      bedrooms: "",
      accomodates: "",
      bathrooms: "",
      startdate: "",
      enddate: "",
      currency: "",
      rate: "",
      stay: "",
      imagedescription: "",
      images: [],
      imageView: [],
      dbnames: [],
      WelcomeFlag: true,
      LocationFlag: false,
      DetailsFlag: false,
      PhotosFlag: false,
      PricingFlag: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onImageChange = e => {
    this.setState({
      images: e.target.files
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    const files = this.state.images;

    for (var index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("http://18.223.168.84:5000/upload", formData, config)
      .then(response => {
        if (response.status == 200) window.alert("Upload successful");
      });

    this.handleGetPhoto();
  };

  //get photo

  handleGetPhoto = e => {
    var fileNames = [];
    for (var index = 0; index < this.state.images.length; index++) {
      fileNames[index] = this.state.images[index].name;
    }

    axios
      .post("http://18.223.168.84:5000/download/" + fileNames)
      .then(response => {
        let imagePreview = [];
        for (var index = 0; index < response.data.length; index++) {
          imagePreview[index] =
            "data:image/jpg;base64, " + response.data[index];
        }

        this.setState({
          imageView: imagePreview
        });
      });
  };

  //get photo ends

  handleWelcomeFlag = () => {
    this.setState({
      WelcomeFlag: true,
      LocationFlag: false,
      DetailsFlag: false,
      PhotosFlag: false,
      PricingFlag: false
    });
  };

  handleLocationFlag = () => {
    this.setState({
      WelcomeFlag: false,
      LocationFlag: true,
      DetailsFlag: false,
      PhotosFlag: false,
      PricingFlag: false
    });
  };

  handleDetailsFlag = () => {
    this.setState({
      WelcomeFlag: false,
      LocationFlag: false,
      DetailsFlag: true,
      PhotosFlag: false,
      PricingFlag: false
    });
  };

  handlePhotosFlag = () => {
    this.setState({
      WelcomeFlag: false,
      LocationFlag: false,
      DetailsFlag: false,
      PhotosFlag: true,
      PricingFlag: false
    });
  };

  handlePricingFlag = () => {
    this.setState({
      WelcomeFlag: false,
      LocationFlag: false,
      DetailsFlag: false,
      PhotosFlag: false,
      PricingFlag: true
    });
  };

  handleProperty = e => {
    e.preventDefault();

    var fileNames = [];
    for (var index = 0; index < this.state.images.length; index++) {
      fileNames[index] = this.state.images[index].name;
    }
    var str2 = "";
    str2 = fileNames.toString();

    const data = {
      username: this.state.username,
      country: this.state.country,
      street: this.state.street,
      building: this.state.building,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      headline: this.state.headline,
      description: this.state.description,
      propertytype: this.state.propertytype,
      bedrooms: this.state.bedrooms,
      accomodates: this.state.accomodates,
      bathrooms: this.state.bathrooms,
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      currency: this.state.currency,
      rate: this.state.rate,
      stay: this.state.stay,
      images: str2
    };

    axios.defaults.withCredentials = true;

    this.props.listProperty(data);
  };

  render() {
    console.log("REDUX PROPS DATA: ", this.props.data);
    console.log("FLAG : ", this.props.listed);

    const { imagedescription, selectedFile } = this.state;

    let redirectVar = null;
    if (this.state.propertyPosted) {
      window.alert("Property posted successfully!");
      redirectVar = <Redirect to="/homeownerredux" />;
    }

    if (this.state.WelcomeFlag) {
      return (
        <div className="div">
          {/* {cookieCheck} */}
          {redirectVar}
          <NavbarMainOwner />

          <div className="sidebar">
            <a href="#" onClick={this.handleWelcomeFlag}>
              Welcome
            </a>
            <a href="#" onClick={this.handleLocationFlag}>
              Location
            </a>
            <a href="#" onClick={this.handleDetailsFlag}>
              Details
            </a>
            <a href="#">Booking Options</a>
            <a href="#" onClick={this.handlePhotosFlag}>
              Photos
            </a>
            <a href="#">Security</a>
            <a href="#">Payment</a>
            <a href="#" onClick={this.handlePricingFlag}>
              Pricing
            </a>
          </div>

          <div className="mainform shadow">
            {" "}
            <h5 className="welcometext">
              <span className="textleft">
                {" "}
                Welcome! Verify the location of your rental{" "}
              </span>
            </h5>
            <p class="lead">Just 4 steps remaining </p>
            <span>
              {" "}
              <a
                className="btn btn-primary btn-md mb-3"
                href="#"
                onClick={this.handleLocationFlag}
              >
                Continue
              </a>
            </span>
          </div>
        </div>
      );
    } else if (this.state.LocationFlag) {
      return (
        <div className="div">
          {/* {localStorage.getItem("user") ? <NavbarMain /> : <NavbarMainOwner />} */}
          <NavbarMainOwner />
          <div className="sidebar">
            <a href="#" onClick={this.handleWelcomeFlag}>
              Welcome
            </a>
            <a href="#" onClick={this.handleLocationFlag}>
              Location
            </a>
            <a href="#" onClick={this.handleDetailsFlag}>
              Details
            </a>
            <a href="#">Booking Options</a>
            <a href="#" onClick={this.handlePhotosFlag}>
              Photos
            </a>
            <a href="#">Security</a>
            <a href="#">Payment</a>
            <a href="#" onClick={this.handlePricingFlag}>
              Pricing
            </a>
          </div>

          <div className="mainform">
            <form>
              <div className="m-5">
                <p class="lead">Please enter the location details : </p>
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Country"
                  onChange={this.onChange}
                  name="country"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="Street Address"
                  onChange={this.onChange}
                  name="street"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="building"
                  placeholder="Unit, Suite, Building, Etc. "
                  onChange={this.onChange}
                  name="building"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  onChange={this.onChange}
                  name="city"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="State"
                  onChange={this.onChange}
                  name="state"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  placeholder="Zip Code"
                  onChange={this.onChange}
                  name="zipcode"
                />
              </div>
              <span className="prev-next">
                {" "}
                <a
                  className="btn btn-primary btn-md mb-3 "
                  href="#"
                  onClick={this.handleWelcomeFlag}
                >
                  Previous
                </a>
              </span>
              <span className="prev-next">
                {" "}
                <a
                  className="btn btn-primary btn-md mb-3 "
                  href="#"
                  onClick={this.handleDetailsFlag}
                >
                  Next
                </a>
              </span>
              <br />
              <hr />
            </form>
          </div>
        </div>
      );
    } else if (this.state.DetailsFlag) {
      return (
        <div className="div">
          <NavbarMainOwner />
          <div className="sidebar">
            <a href="#" onClick={this.handleWelcomeFlag}>
              Welcome
            </a>
            <a href="#" onClick={this.handleLocationFlag}>
              Location
            </a>
            <a href="#" onClick={this.handleDetailsFlag}>
              Details
            </a>
            <a href="#">Booking Options</a>
            <a href="#" onClick={this.handlePhotosFlag}>
              Photos
            </a>
            <a href="#">Security</a>
            <a href="#">Payment</a>
            <a href="#" onClick={this.handlePricingFlag}>
              Pricing
            </a>
          </div>

          <div className="mainform">
            <form>
              <div className="m-5">
                <p class="lead">Please enter the property details : </p>
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  placeholder="Headline / Title"
                  onChange={this.onChange}
                  name="headline"
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control box-width m-5 input-sm"
                  rows="6"
                  cols="20"
                  name="description"
                  id="description"
                  onChange={this.onChange}
                  placeholder="Property description...."
                  maxLength="600"
                />
              </div>

              <p className="textalign">Property type:</p>

              <div className="form-group mt-4 ml-5">
                <select
                  name="propertytype"
                  className="form-control btn-sm box-width"
                  onChange={this.onChange}
                  id="propertytype"
                >
                  <option disabled value>
                    Select type of property
                  </option>

                  <option value="apartment">Apartment</option>
                  <option value="barn">Barn</option>
                  <option value="bed &amp; breakfast">
                    Bed &amp; Breakfast
                  </option>
                  <option value="boat">Boat</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="cabin">Cabin</option>
                  <option value="campground">Campground</option>
                  <option value="castle">Castle</option>
                  <option value="chalet">Chalet</option>
                  <option value="country house / chateau">
                    Chateau / Country House
                  </option>
                  <option value="condo">Condo</option>
                  <option value="corporate apartment">
                    Corporate Apartment
                  </option>
                  <option value="cottage">Cottage</option>
                  <option value="estate">Estate</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="guest house/pension">Guest House</option>
                  <option value="hostel">Hostel</option>
                  <option value="hotel">Hotel</option>
                  <option value="hotel suites">Hotel Suites</option>
                  <option selected="" value="house">
                    House
                  </option>
                  <option value="house boat">House Boat</option>
                  <option value="lodge">Lodge</option>
                  <option value="Mill">Mill</option>
                  <option value="mobile home">Mobile Home</option>
                  <option value="Recreational Vehicle">
                    Recreational Vehicle
                  </option>
                  <option value="resort">Resort</option>
                  <option value="studio">Studio</option>
                  <option value="Tower">Tower</option>
                  <option value="townhome">Townhome</option>
                  <option value="villa">Villa</option>
                  <option value="yacht">Yacht</option>
                </select>
              </div>

              <p className="textalign">Bedrooms:</p>

              <div class="form-group mt-4 ml-5">
                <select
                  className="form-control btn-sm box-width"
                  onChange={this.onChange}
                  id="bedrooms"
                  name="bedrooms"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <p className="textalign">Accomodates:</p>
              <div class="form-group mt-4 ml-5">
                <select
                  className="form-control btn-sm box-width"
                  onChange={this.onChange}
                  id="accomodates"
                  name="accomodates"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div class="form-group mt-4 ml-5">
                <p className="textalign">Bathrooms:</p>
                <select
                  className="form-control btn-sm box-width"
                  onChange={this.onChange}
                  id="bathrooms"
                  name="bathrooms"
                >
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>
                  <option value="5">5</option>
                </select>
              </div>

              <span className="prev-next">
                {" "}
                <a
                  className="btn btn-primary btn-md mb-3 "
                  href="#"
                  onClick={this.handleLocationFlag}
                >
                  Previous
                </a>
              </span>
              <span className="prev-next">
                {" "}
                <a
                  className="btn btn-primary btn-md mb-3 "
                  href="#"
                  onClick={this.handlePhotosFlag}
                >
                  Next
                </a>
              </span>
              <br />
              <hr />
            </form>
          </div>
        </div>
      );
    } else if (this.state.PhotosFlag) {
      return (
        <div className="div">
          <NavbarMainOwner />

          <div className="sidebar">
            <a href="#" onClick={this.handleWelcomeFlag}>
              Welcome
            </a>
            <a href="#" onClick={this.handleLocationFlag}>
              Location
            </a>
            <a href="#" onClick={this.handleDetailsFlag}>
              Details
            </a>
            <a href="#">Booking Options</a>
            <a href="#" onClick={this.handlePhotosFlag}>
              Photos
            </a>
            <a href="#">Security</a>
            <a href="#">Payment</a>
            <a href="#" onClick={this.handlePricingFlag}>
              Pricing
            </a>
          </div>

          <div className="mainform">
            {" "}
            <p class="lead phototext">Add photos of your property : </p>
            <p>Showcase your property’s best features. </p>
            <p>
              <h6>
                {" "}
                Requirements: JPEG, less than 1MB file size, minimum 2 and 5
                photos maximum.{" "}
              </h6>
            </p>
            {/* IMAGE UPLOAD start */}
            <div>
              <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  name="selectedFile"
                  multiple
                  onChange={this.onImageChange}
                />
                <button
                  className="btn btn-primary"
                  style={{ "margin-bottom": "1%" }}
                  type="submit"
                >
                  Upload
                </button>
                <br />
              </form>

              <div>
                <img
                  src={this.state.imageView[0]}
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src={this.state.imageView[1]}
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src={this.state.imageView[2]}
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src={this.state.imageView[3]}
                  style={{ height: "100px", width: "100px" }}
                />
                <img
                  src={this.state.imageView[4]}
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
            </div>
            {/* IMAGE UPLOAD end */}
            <br />
            <span className="prev-next">
              {" "}
              <a
                className="btn btn-primary btn-md mb-3 "
                href="#"
                onClick={this.handleDetailsFlag}
              >
                Previous
              </a>
            </span>
            <span className="prev-next">
              {" "}
              <a
                className="btn btn-primary btn-md mb-3 "
                href="#"
                onClick={this.handlePricingFlag}
              >
                Next
              </a>
            </span>
            <br />
            <hr />
          </div>
        </div>
      );
    } else if (this.state.PricingFlag) {
      return (
        <div className="div">
          <NavbarMainOwner />

          <div className="sidebar">
            <a href="#" onClick={this.handleWelcomeFlag}>
              Welcome
            </a>
            <a href="#" onClick={this.handleLocationFlag}>
              Location
            </a>
            <a href="#" onClick={this.handleDetailsFlag}>
              Details
            </a>
            <a href="#">Booking Options</a>
            <a href="#" onClick={this.handlePhotosFlag}>
              Photos
            </a>
            <a href="#">Security</a>
            <a href="#">Payment</a>
            <a href="#" onClick={this.handlePricingFlag}>
              Pricing
            </a>
          </div>

          <div className="mainform">
            <form>
              <div className="m-5">
                <p class="lead toptextmargin">
                  Please select the property availability dates :{" "}
                </p>
              </div>

              <div class="input-group box-width m-5 ">
                <div class="input-group-prepend">
                  <div class="input-group-text">Start:</div>
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

              <div class="input-group box-width m-5 ">
                <div class="input-group-prepend">
                  <div class="input-group-text">End:</div>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="enddate"
                  name="enddate"
                  onChange={this.onChange}
                  placeholder="End Date"
                />
              </div>

              <div className="m-5">
                <p class="lead">Please enter the pricing details : </p>
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="currency"
                  placeholder="Currency"
                  onChange={this.onChange}
                  name="currency"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="rate"
                  placeholder="Nightly Base Rate"
                  onChange={this.onChange}
                  name="rate"
                />
              </div>

              <div className="form-group box-width m-5">
                <input
                  type="text"
                  className="form-control"
                  id="stay"
                  placeholder="Minimum stay "
                  onChange={this.onChange}
                  name="stay"
                />
              </div>

              <span className="left-previous">
                {" "}
                <a
                  className="btn btn-primary btn-md mb-3 "
                  href="#"
                  onClick={this.handlePhotosFlag}
                >
                  Previous
                </a>
              </span>
              <br />
              <hr />
              <div className="ml-10">
                <button
                  type="submit"
                  className="btn btn-primary btn-md mb-3"
                  onClick={this.handleProperty}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log("Inside list property map state to props: ", state);

  return {
    data: state.reducer.data,
    listed: state.reducer.listed
  };
};

const mapDispatchStateToProps = dispatch => {
  console.log("Inside list property map dispatch to props");
  return {
    listProperty: data => {
      axios
        .post("http://18.223.168.84:5000/listproperty", data)
        .then(response => {
          console.log(response.data);
          window.alert("Property posted successfully");
          dispatch({
            type: "LIST_PROPERTY",
            payload: response.data
          });
        });

      console.log("List property Action dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(PropertyNewRedux);
