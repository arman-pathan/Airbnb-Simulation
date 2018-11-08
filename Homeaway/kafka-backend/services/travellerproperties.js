require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;

console.log(
  "---------------------INSIDE /SERVICES/TravellerPROPERTIES.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services Travellerproperties.js handle request:" + JSON.stringify(msg)
  );
  console.log("kafka call...");

  //Travellerproperties logic

  Listproperty.find(
    {
      username: msg.username,
      booked: true
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when getting!");
        callback(err, "Error");
      } else {
        console.log("Traveller's booked properties are:", result);
        callback(null, result);
      }
    }
  );

  //Travellerproperties logic ends
}

exports.handle_request = handle_request;
