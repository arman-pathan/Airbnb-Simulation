var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../backend/config/keys");

const saltRounds = 10;

require("../db/mongoose");
var Userprofile = require("../models/userprofile");
var Listproperty = require("../models/listproperty");

console.log("---------------------INSIDE /SERVICES/LOGIN.js------------------");
function handle_request(msg, callback) {
  console.log("In services login.js handle request:" + JSON.stringify(msg));
  console.log("kafka call...");
  //login logic
  // callback(err,null);

  Userprofile.findOne(
    {
      username: msg.username,
      ownercheck: false
    },
    function(err, result) {
      console.log("inside db call..");

      if (err) {
        var data = {
          message: "user not found",
          status: 400
        };
        callback(null, data);
      } else {
        console.log("Found user:");
        console.log("username: ", msg.username);
        console.log("RESULT PASSWORD: ", result.password);
        console.log("CHECKING PASSWORD: ", result.password);

        bcrypt.compare(msg.password, result.password, function(err, isMatch) {
          console.log("Inside bcrypt");
          if (err) {
            console.log("Username password is incorrect");

            error = {
              message: "User name/password is incorrect",
              code: 401
            };
            callback(null, error);
          } else if (isMatch) {
            console.log("PASSWORD MATCHED: ");
            console.log("Welcome");
            console.log("RESULT: ", result);

            var data = { username: result.username };
            jwt.sign(
              data,
              secret.secretOrKey,
              { expiresIn: 600000 },
              (err, token) => {
                const newToken = "Bearer " + token;
                console.log("token=", newToken);
                var result = {
                  token: newToken,
                  status: 200
                };
                callback(null, result);
              }
            );
            //jwt token generation here

            //   var data = { username: result.username
            // };

            // jwt.sign(data, dbkey.secretorKey)
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;
