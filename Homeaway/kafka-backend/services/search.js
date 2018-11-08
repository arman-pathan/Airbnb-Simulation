require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;

console.log(
  "---------------------INSIDE /SERVICES/SEARCH.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services search.js handle request:" + JSON.stringify(msg));
  console.log("kafka call...");

  //search logic

  Listproperty.find(
    {
      country: msg.country,
      startdate: { $lte: msg.startdate },
      enddate: { $gte: msg.enddate },
      accomodates: msg.accomodates
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when searching!");
        callback(err, "Error");
      } else {
        console.log("Search results are:", result);

        callback(null, result);
      }
    }
  );

  //search logic ends
}

exports.handle_request = handle_request;
