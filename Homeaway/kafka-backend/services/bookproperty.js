require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;

console.log(
  "---------------------INSIDE /SERVICES/BOOKPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services bookproperty.js handle request:" + JSON.stringify(msg)
  );
  console.log("kafka call...");

  //book logic

  Listproperty.findOneAndUpdate(
    { _id: msg.id },
    {
      $set: {
        booked: true,
        username: msg.username
      }
    },

    { new: true },
    (err, result) => {
      if (err) {
        console.log("Something wrong when booking property!");
        callback(err, "Error");
      } else {
        console.log("Booked details", result);
        callback(null, result);
      }
    }
  );

  //book logic ends
}

exports.handle_request = handle_request;
