var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("-----------------INSIDE CLIENT.JS----------------------------");
  console.log("In client.js make request file");
  console.log("request on topic name", queue_name);
  console.log("Message data received from index.js: ", msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function(err, response) {
    if (err) console.error(err);
    else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
