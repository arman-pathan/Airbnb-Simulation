const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var UserProfile = require("../models/userprofile");
const secret = require("./keys");

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret.secretOrKey;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserProfile.findOne({ username: jwt_payload.username })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
