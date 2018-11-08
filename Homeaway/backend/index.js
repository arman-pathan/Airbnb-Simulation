var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var kafka = require("./kafka/client");

var jwt = require("jsonwebtoken");
const secret = require("./config/keys");
var Userprofile = require("./models/userprofile");
var Listproperty = require("./models/listproperty");

var { mongoose } = require("./db/mongoose");

var mysql = require("mysql");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//passport starts

//require passport
const passport = require("passport");
//app.use(cors());

app.use(cors({ origin: "http://18.224.19.74:3000", credentials: true }));
// app.use(cors({ origin: "http://18.224.19.74:3000/", credentials: true }));

console.log(
  "-----------------INSIDE NODE INDEX.JS----------------------------"
);
//app.use(passport.initialize());

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//strategy creation
require("./config/passport")(passport);

var requireAuth = passport.authenticate("jwt", { session: false });

//passport ends

//IMAGES ROUTES

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("filename=" + file.originalname);

    const newFilename = file.originalname;

    cb(null, newFilename);
  }
});

var maxSize = 1 * 1000 * 1000;
const upload = multer({ storage, limits: { fileSize: maxSize } }).any();

app.post("/upload", function(req, res) {
  console.log("Inside upload Post Request");
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/download/:file(*)", (req, res) => {
  console.log("Downloading Photo");

  console.log(req.params.file);

  var fileNames = req.params.file.split(",");

  console.log(fileNames);

  var base64imgArr = [];

  fileNames.map(fileName => {
    var fileLocation = path.join(__dirname + "/uploads", fileName);

    console.log("FILE LOCATION", fileLocation);
    var img = fs.readFileSync(fileLocation);
    base64img = new Buffer(img).toString("base64");
    base64imgArr.push(base64img);
  });
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(JSON.stringify(base64imgArr));
});

//image ends

app.use(cookieParser());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://18.224.19.74:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

//USER ROUTES
app.post("/login", function(req, res) {
  console.log("------Inside traveller Login----------");
  var username = req.body.username;
  var password = req.body.password;

  console.log("Front end credentials:");
  console.log("Username:", username + " password:", password);

  kafka.make_request("login_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        error: err
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/ownerlogin", function(req, res) {
  console.log("Inside owner login");
  var username = req.body.username;
  var password = req.body.password;
  console.log("Logged in as:");
  console.log("Username:", username + " password:", password);

  kafka.make_request("ownerlogin_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/signup", function(req, res) {
  console.log("Inside traveller sign up");

  kafka.make_request("signup_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/ownersignup", function(req, res) {
  console.log("Inside owner sign up");

  kafka.make_request("ownersignup_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/profile", function(req, res) {
  console.log("Inside update profile");
  console.log(req.body.username);

  console.log(req.body.gender);

  kafka.make_request("profile_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

//PROPERTY ROUTES

app.post("/listproperty", function(req, res) {
  console.log("Inside List Property");

  console.log("Images:", req.body.images);
  const username = req.body.username;
  console.log(username);

  kafka.make_request("listproperty_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/search", function(req, res) {
  console.log("Inside search ");

  console.log(req.body.country);
  console.log(req.body.startdate);

  console.log(req.body.enddate);

  console.log(req.body.accomodates);

  kafka.make_request("search_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.get("/ownerproperties/:username", function(req, res) {
  console.log(req.params.username);

  kafka.make_request("ownerproperties_topic", req.params, function(
    err,
    result
  ) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.get("/travellerproperties/:username", function(req, res) {
  console.log(req.params.username);

  kafka.make_request("travellerproperties_topic", req.params, function(
    err,
    result
  ) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.post("/bookproperty", function(req, res) {
  console.log("Inside book property ");

  kafka.make_request("bookproperty_topic", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: result
      });

      res.end();
    }
  });
});

app.get("/user/:username", function(req, res) {
  console.log(req.params.username);

  Userprofile.findOne(
    {
      username: req.params.username
    },

    (err, user) => {
      if (err) {
        console.log("Something wrong when getting user!");
        res.sendStatus(400).end();
      } else {
        console.log("User is:", user);
        res.send(user);
      }
    }
  );
});

app.post("/sendmessage", function(req, res) {
  console.log("Inside messaging ");

  console.log(req.body.sender);
  console.log(req.body.sendmessage);
  console.log(req.body.receiver);

  var messageobject = {
    sender: req.body.sender,
    message: req.body.sendmessage
  };

  Userprofile.findOneAndUpdate(
    { username: req.body.receiver },
    {
      $push: {
        inbox: messageobject
      }
    },
    (err, result) => {
      if (err) {
        console.log("Something wrong when sending message!");
        res.sendStatus(400).end();
      } else {
        console.log("Sent message is:", result);
        res.sendStatus(200).end();
      }
    }
  );
});

app.post("/filter", function(req, res) {
  console.log("Inside filter ");

  console.log(req.body.country);
  console.log(req.body.startdate);

  console.log(req.body.enddate);

  console.log(req.body.accomodates);

  console.log(req.body.price);

  console.log(req.body.bedrooms);

  Listproperty.find(
    {
      country: req.body.country,
      startdate: { $lte: req.body.startdate },
      enddate: { $gte: req.body.enddate },
      accomodates: req.body.accomodates,
      rate: req.body.price,
      bedrooms: req.body.bedrooms
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when filtering!");
        res.sendStatus(400).end();
      } else {
        console.log("Filter results are:", result);

        res.send({ result });
      }
    }
  );
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
