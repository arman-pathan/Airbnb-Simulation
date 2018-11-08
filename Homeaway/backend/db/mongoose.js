var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://root:root123@ds213239.mlab.com:13239/homeaway")
  .then(() => console.log("Connected to mongoDB database now"))
  .catch(err => console.error("Could not connect to mongoDB...", err));

// mongoose
//   .connect("mongodb://localhost:27017/homeaway")
//   .then(() => console.log("Connected to mongoDB database"))
//   .catch(err => console.error("Could not connect to mongoDB...", err));

module.exports = { mongoose };
