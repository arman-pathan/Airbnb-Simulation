require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");
const saltRounds = 10;

console.log(
  "---------------------INSIDE /SERVICES/SIGNUP.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services signup.js handle request:" + JSON.stringify(msg));
  console.log("kafka call...");

  //signup logic

  bcrypt.hash(msg.password, saltRounds, function(err, hash) {
    console.log("PLAINTEXT password: ", msg.password);

    console.log("HASHED PASSWORD: ", hash);

    var user = new Userprofile({
      username: msg.username,
      password: hash,
      firstname: msg.firstname,
      lastname: msg.lastname,
      ownercheck: false
    });

    console.log("inside db call..");
    console.log("created traveller account:");
    console.log("ACCOUNT: ", msg);

    user.save().then(
      user => {
        console.log("User created and Signed up successfuly : ", user);

        callback(null, user);
      },
      err => {
        console.log("Error Creating user");

        callback(err, "Error");
      }
    );
  });

  //sign up ends
}

exports.handle_request = handle_request;
