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
  "---------------------INSIDE /SERVICES/OWNERLOGIN.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services ownerlogin.js handle request:" + JSON.stringify(msg)
  );
  console.log("kafka call...");
  //login logic

  Userprofile.findOne(
    {
      username: msg.username,
      ownercheck: true
    },
    function(err, result) {
      console.log("inside db call..");
      console.log("Found user owner:");
      console.log("username: ", msg.username);

      if (err) {
        callback(err, "Error");
      } else {
        console.log("RESULT PASSWORD: ", result.password);

        bcrypt.compare(msg.password, result.password, function(err, isMatch) {
          console.log("Inside bcrypt");

          if (isMatch) {
            console.log("RESULT: ", result);

            var data = { username: result.username };
            jwt.sign(
              data,
              secret.secretOrKey,
              { expiresIn: 600000 },
              (err, token) => {
                const newToken = "Bearer " + token;
                console.log("token=", newToken);
                callback(null, newToken);
              }
            );
            //jwt token generation here

            //   var data = { username: result.username
            // };

            // jwt.sign(data, dbkey.secretorKey)
          } else if (err) {
            console.log("Username password is incorrect");

            callback(null, []);
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;
