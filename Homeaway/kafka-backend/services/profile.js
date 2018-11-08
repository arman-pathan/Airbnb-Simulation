//var Userprofile = require("../../backend/models/userprofile");

require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;
//require("../../backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/PROFILE.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services profile.js handle request:" + JSON.stringify(msg));
  console.log("kafka call...");

  //profile logic

  Userprofile.findOneAndUpdate(
    { username: msg.username },
    {
      $set: {
        firstname: msg.firstname,
        lastname: msg.lastname,
        about: msg.aboutme,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        languages: msg.languages,
        gender: msg.gender,
        city: msg.city,
        phone: msg.phone
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log("Something wrong when updating data!");

        callback(err, "Error");
      } else {
        console.log("Updated profile details are:", result);

        callback(null, result);
      }
    }
  );

  //profile logic ends
}

exports.handle_request = handle_request;
