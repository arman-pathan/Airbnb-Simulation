import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Messaging.css";
import NavbarMain from "./NavbarMain";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import NavbarMainOwner from "./NavbarMainOwner";

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: window.localStorage.getItem("user"),
      firstname: "",
      lastname: "",
      sendmessage: "",
      receiver: "",
      inbox: []
    };

    this.handlesendmessage = this.handlesendmessage.bind(this);
  }

  handlesendmessage = e => {
    this.setState({
      sendmessage: e.target.value
    });
  };

  handleReceiver = e => {
    this.setState({
      receiver: e.target.value
    });
  };

  componentDidMount() {
    axios
      .get(`http://18.223.168.84:5000/user/${this.state.username}`)
      .then(response => {
        console.log(response);

        const { firstname, lastname, sendmessage, inbox } = response.data;

        this.setState({
          firstname,
          lastname,
          sendmessage,
          inbox
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log("HANDLE SUBMIT CALLED:");
    console.log("HANDLE SUBMIT receiver:", this.state.receiver);
    console.log("HANDLE SUBMIT sender:", this.state.username);
    console.log("HANDLE SUBMIT sendmessage:", this.state.sendmessage);

    const data = {
      receiver: this.state.receiver,
      sender: this.state.username,
      sendmessage: this.state.sendmessage
    };

    console.log("Inside handle profile");

    this.props.onSend(data);
  };

  render() {
    // if (this.props.sent) {
    //   console.log(this.props.sent);
    //   console.log("Sent message successfully");

    //   window.alert("Message sent successfully");

    // }
    // const { sender, messages } = this.state.inbox[0];

    console.log("STATE INBOX  ", this.state.inbox);

    var messages = [];

    messages = messages.concat(this.state.inbox);

    let allmessages = messages.map(message => {
      return (
        <div>
          {message.sender} says : {message.message}
          <br />
        </div>
      );
    });

    // var object1 = this.state.inbox[0];

    // console.log("INBOX 1st object  ", this.state.inbox[0]);

    // var cloneobject1 = {
    //   ...object1
    // };
    // console.log("INBOX 1st object  ", cloneobject1.sender);
    // console.log("INBOX 1st object array ", cloneobject1.messages);

    // var copyarray1 = [];

    // var copyarray1 = copyarray1.concat(cloneobject1.messages);

    // // for (let index = 0; index < cloneobject1.messages.length - 1; index++) {
    // //   console.log(cloneobject1.messages[index]);
    // // }
    // console.log("copyarray1 ", copyarray1[0]);
    // console.log("copyarray1 ", copyarray1[1]);
    // console.log("Inbox 1st object messages array ", messages);
    // console.log("STATE INBOX  ",this.state.inbox);
    // console.log("STATE INBOX  ",this.stsate.inbox);

    return (
      <div>
        {/* {Check} */}

        {/* {localStorage.getItem("user") ? <NavbarMain /> : <NavbarMainOwner />} */}
        <NavbarMain />
        {/* {console.log(this.props.sent)} */}
        <nav id="navbar">
          <div class="container-fluid">
            <ul>
              <li>
                <a active href="#">
                  Inbox
                </a>
              </li>
              <li>
                <a href="#">My trips</a>
              </li>
              <li>
                <a href="/userprofileredux">Profile</a>
              </li>
              <li>
                <a href="#">Account</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid profilepic">
          <h1
            style={{
              "margin-top": "0%",
              color: "darkred"
            }}
            className="display-6 middletext"
          >
            {" "}
            {this.state.firstname} {this.state.lastname}
            's Messages{" "}
          </h1>
        </div>

        <div style={{ "margin-left": "auto" }} className="container message">
          <div className="profileform">
            <h2>
              {" "}
              {this.state.firstname} {this.state.lastname}
              's Inbox{" "}
            </h2>
            <br />
            <div>
              <p> Your messages: </p>

              {allmessages}
            </div>
            {/* <div>
              {" "}
              <p>
                {" "}
                Message 1 from {cloneobject1.sender}: {copyarray1[0]}{" "}
              </p>{" "}
            </div>
            <div>
              {" "}
              <p>
                {" "}
                Message 2 from {cloneobject1.sender}: {copyarray1[1]}{" "}
              </p>{" "}
            </div> */}
            {/* <div>
              {" "}
              <p>
                {" "}
                Message 1 from {this.state.inbox[1].sender}:{" "}
                {this.state.inbox[1].messages[0]}{" "}
              </p>{" "}
            </div>
            <div>
              {" "}
              <p>
                {" "}
                Message 2 from {this.state.inbox[1].sender}:{" "}
                {this.state.inbox[1].messages[1]}{" "}
              </p>{" "}
            </div> */}
            <h2>Compose a message</h2>
            <br />
            <p class="lead" style={{ float: "left", "margin-right": "5%" }}>
              {" "}
              To:{" "}
            </p>

            <form>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="receiver"
                  placeholder="Receiver of the message"
                  onChange={this.handleReceiver}
                  name="receiver"
                  value={this.state.receiver}
                />
              </div>
              <br />

              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="20"
                  name="sendmessage"
                  id="sendmessage"
                  style={{ height: 200, width: 500 }}
                  onChange={this.handlesendmessage}
                  placeholder="Type your message"
                  maxLength="400"
                />
              </div>
              <br />

              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  style={{
                    float: "left",
                    margin: "-25px 0px 0px 0px",
                    height: "50px",
                    lineheight: "50px"
                  }}
                  onClick={this.handleSubmit}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Inside map state to props ");
  return {
    sent: state.reducer.sent
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    onSend: data => {
      axios
        .post("http://18.223.168.84:5000/sendmessage", data)
        .then(response => {
          console.log("RESPONSE", response.data);
          window.alert(`Message sent successfully`);
          dispatch({
            type: "SEND_MESSAGE",
            payload: response.data,
            statusCode: response.status
          });
        });

      console.log("Dispatched");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Messaging);
