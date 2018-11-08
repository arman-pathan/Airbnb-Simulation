// var Userprofile = require("../../backend/models/userprofile");

// var Listproperty = require("../../backend/models/listproperty");
require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;
// var Userprofile = require("../models/userprofile");

// var Listproperty = require("../models/listproperty");
// require("../db/mongoose");
// require("../../backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/OWNERPROPERTIES.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services ownerproperties.js handle request:" + JSON.stringify(msg)
  );
  console.log("kafka call...");

  //ownerproperties logic

  Listproperty.find(
    {
      ownername: msg.username,
      booked: true
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when getting!");
        callback(err, "Error");
      } else {
        console.log("Owner's booked properties are:", result);
        callback(null, result);
      }
    }
  );

  //ownerproperties logic ends
}

exports.handle_request = handle_request;
