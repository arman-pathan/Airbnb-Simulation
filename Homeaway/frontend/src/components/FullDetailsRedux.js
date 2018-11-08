import React, { Component } from "react";
import NavbarMain from "./NavbarMain";
import "./FullDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import NavbarMainOwner from "./NavbarMainOwner";

class FullDetailsRedux extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.state);

    const {
      country,
      startdate,
      enddate,
      accomodates,
      property
    } = this.props.location.state;

    // console.log(country);
    // console.log(startdate);
    // console.log(enddate);
    // console.log(accomodates);
    // console.log(property);

    this.state = {
      username: window.localStorage.getItem("user"),
      country: country,
      startdate: startdate,
      enddate,
      accomodates,
      property,
      imageView: []
    };
  }

  componentDidMount() {
    var files = this.state.property.images.split(",");

    axios.post("http://18.223.168.84:5000/download/" + files).then(response => {
      let imagePreview = [];
      for (var index = 0; index < response.data.length; index++) {
        imagePreview[index] = "data:image/jpg;base64, " + response.data[index];
      }

      this.setState({
        imageView: imagePreview
      });

      console.log("Retrieved images:", this.state.imageView);
    });
  }

  handleBooking = e => {
    e.preventDefault();

    const data = {
      id: this.state.property._id,
      username: this.state.username
      //username: window.localStorage.getItem(username),
      //property: property
    };

    this.props.BookProperty(data);
  };

  render() {
    console.log("REDUX PROPS DATA: ", this.props.data);

    if (this.props.booked) {
      console.log("Booked successfully");
      window.alert("Property Booked Successfuly");
    }

    return (
      <div className="div">
        {localStorage.getItem("user") ? <NavbarMain /> : <NavbarMainOwner />}

        {/* Below search bar*/}
        <br />
        <div className="container">
          {/* left */}
          <div className="detail">
            <br />
            <br />
            <div class="media">
              <img
                class="media-center "
                width="301"
                height="177"
                alt="Image"
                src={this.state.imageView[0]}
              />
              <img
                class="media-center "
                width="301"
                height="177"
                alt="Image"
                src={
                  this.state.imageView[1]
                    ? this.state.imageView[1]
                    : this.state.imageView[0]
                }
              />
            </div>
            <div class="media">
              <img
                class="media-center"
                width="301"
                height="177"
                alt="Image"
                src={
                  this.state.imageView[2]
                    ? this.state.imageView[2]
                    : require("../default-image/white.png")
                }
              />
              <img
                class="media-center "
                width="301"
                height="177"
                alt="Image"
                src={
                  this.state.imageView[3]
                    ? this.state.imageView[3]
                    : require("../default-image/white.png")
                }
              />
            </div>
            <br />
            <span>{this.state.property.headline}</span>
            <p>
              {" "}
              <i class="fa fa-map-marker iconscolor" />{" "}
              {this.state.property.city} , {this.state.property.state},{" "}
              {this.state.property.zipcode}, {this.state.property.country}{" "}
            </p>
            <p>
              {" "}
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star-half-o iconscolor" />
              <span>14 Reviews </span>
            </p>
            {/* ICONS start*/}

            <table cellpadding="20px">
              <tr>
                <th>
                  {" "}
                  <i class="fa fa-home fa-3x iconscolor" />
                </th>
                <th>
                  {" "}
                  <i class="fa fa-bed fa-3x iconscolor" />
                </th>
                <th>
                  {" "}
                  <i class="fa fa-user fa-3x iconscolor" />
                </th>
                <th>
                  {" "}
                  <i class="fa fa-bath fa-3x iconscolor" />
                </th>
                <th>
                  {" "}
                  <i class="fa fa-moon-o fa-3x iconscolor" />
                </th>
              </tr>
              <tr>
                <td>Apartment type</td>
                <td>Bedroom</td>
                <td>Sleep</td>
                <td>Bathroom</td>
                <td>Stay</td>
              </tr>
              <tr>
                <td> {this.state.property.propertytype}</td>
                <td>{this.state.property.bedrooms}</td>
                <td> {this.state.property.accomodates}</td>
                <td>{this.state.property.bathrooms}</td>
                <td>{this.state.property.stay}</td>
              </tr>
            </table>

            {/* ICONS end*/}
            <p> {this.state.property.description}</p>
            <br />
          </div>

          {/* right */}
          <div className="sidediv">
            <br />
            <br />
            <i class="fa fa-bolt iconscolor " />{" "}
            <span>$ {this.state.property.rate} per night</span>
            <p>
              {" "}
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star iconscolor" />
              <i class="fa fa-star-half-o iconscolor" />
              <span>14 Reviews </span>
            </p>
            <p>
              <i class="fa fa-check-circle checkboxcolor" />
              Your dates are Available!
            </p>
            <form class="form-inline">
              <div class="input-group ml-3 mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="startdate"
                  placeholder="Oct 21"
                  value={this.state.startdate}
                />
              </div>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="enddate"
                  placeholder="Oct 24"
                  value={this.state.enddate}
                />
              </div>
            </form>
            <div className="ml-3 mr-3">
              <input
                type="text"
                class="form-control"
                id="accomodates"
                placeholder="No of Guests"
                value={this.state.accomodates}
              />
            </div>
            <p>
              {" "}
              <span> Total:</span>
              <span> $ {this.state.property.rate}</span>{" "}
            </p>
            <p>
              {" "}
              <span> Includes taxes and fees</span>
              <span>
                {" "}
                <a href="#">View details </a>
              </span>{" "}
            </p>
            <p>
              {" "}
              <button onClick={this.handleBooking} className="btn btn-primary">
                {" "}
                Book Now
              </button>
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Inside book property map state to props: ", state);

  return {
    data: state.reducer.data,
    booked: state.reducer.booked
  };
};

const mapDispatchStateToProps = dispatch => {
  console.log("Inside book property map dispatch to props");
  return {
    BookProperty: data => {
      axios
        .post("http://18.223.168.84:5000/bookproperty", data)
        .then(response => {
          console.log(response.data);

          dispatch({
            type: "BOOK_PROPERTY",
            payload: response.data
          });
        });

      console.log("Book property Action dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(FullDetailsRedux);
