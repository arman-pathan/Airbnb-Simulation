require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;

console.log(
  "---------------------INSIDE /SERVICES/LISTPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services listproperty.js handle request:" + JSON.stringify(msg)
  );
  console.log("kafka call...");

  //property logic

  var property = new Listproperty({
    country: msg.country,
    street: msg.street,
    building: msg.building,
    city: msg.city,
    state: msg.state,
    zipcode: msg.zipcode,
    headline: msg.headline,
    description: msg.description,
    propertytype: msg.propertytype,
    bedrooms: msg.bedrooms,
    accomodates: msg.accomodates,
    bathrooms: msg.bathrooms,
    startdate: msg.startdate,
    enddate: msg.enddate,
    currency: msg.currency,
    rate: msg.rate,
    stay: msg.stay,
    username: "",
    ownername: msg.username,
    booked: false,
    images: msg.images
  });

  property.save().then(
    property => {
      console.log("Property listed successfuly : ", property);
      callback(null, property);
    },
    err => {
      console.log("Error listing property");
      callback(err, "Error");
    }
  );

  //property logic ends
}

exports.handle_request = handle_request;
