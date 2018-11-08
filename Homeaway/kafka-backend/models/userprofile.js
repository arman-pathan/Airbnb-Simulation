var mongoose = require("mongoose");

module.exports = mongoose.model(
  "userprofile",
  {
    username: {
      type: String
    },
    password: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    about: {
      type: String
    },
    company: {
      type: String
    },
    school: {
      type: String
    },
    hometown: {
      type: String
    },
    languages: {
      type: String
    },
    gender: {
      type: String
    },
    city: {
      type: String
    },
    phone: {
      type: String
    },
    ownercheck: {
      type: Boolean
    },
    inbox: [
      {
        sender: String,
        message: String
      }
    ]
  },
  "userprofile"
);
