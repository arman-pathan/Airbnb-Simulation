var mongoose = require("mongoose");

module.exports = mongoose.model(
  "listproperty",
  {
    country: {
      type: String
    },
    street: {
      type: String
    },
    building: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    },
    headline: {
      type: String
    },
    description: {
      type: String
    },
    propertytype: {
      type: String
    },
    bedrooms: {
      type: String
    },
    accomodates: {
      type: String
    },
    bathrooms: {
      type: String
    },
    startdate: {
      type: Date
    },
    enddate: {
      type: Date
    },
    currency: {
      type: String
    },
    rate: {
      type: String
    },
    stay: {
      type: String
    },
    username: {
      type: String
    },
    ownername: {
      type: String
    },
    booked: {
      type: Boolean
    },
    images: {
      type: String
    }
  },
  "listproperty"
);
