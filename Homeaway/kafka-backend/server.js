var connection = new require("./kafka/Connection");

//topic files

var login = require("./services/login.js");
var ownerlogin = require("./services/ownerlogin");
var signup = require("./services/signup");
var ownersignup = require("./services/ownersignup");
var profile = require("./services/profile");
var listproperty = require("./services/listproperty");
var search = require("./services/search");
var ownerproperties = require("./services/ownerproperties");
var travellerproperties = require("./services/travellerproperties");
var bookproperty = require("./services/bookproperty");

//topic files

console.log(
  "---------------------INSIDE KAFKA_BACKEND SERVER.js------------------"
);
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';

  console.log("-------Inside server.js Handle topic request--------");

  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      if (err) console.log(err);

      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("login_topic", login);
handleTopicRequest("ownerlogin_topic", ownerlogin);
handleTopicRequest("signup_topic", signup);
handleTopicRequest("ownersignup_topic", ownersignup);
handleTopicRequest("profile_topic", profile);
handleTopicRequest("listproperty_topic", listproperty);
handleTopicRequest("search_topic", search);
handleTopicRequest("ownerproperties_topic", ownerproperties);
handleTopicRequest("travellerproperties_topic", travellerproperties);
handleTopicRequest("bookproperty_topic", bookproperty);
