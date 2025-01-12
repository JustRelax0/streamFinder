import React from "react";
import ServiceButton from "./ServiceButton.jsx";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [
        "netflix",
        "hulu",
        "amazon-prime",
        "vudu",
        "HBOmax",
        "disney-plus",
        "peacock",
        "paramount-plus",
        "AMC-plus",
      ],
      subscriptions: [],
      subscriptionTracker: {},
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleStreamSelect = this.handleStreamSelect.bind(this);
    this.updateUserState = props.updateUserState;
    this.showModal = props.showModal;
    this.updateState = props.updateState;
  }

  handleSubmitClick(e) {
    e.preventDefault();

    if (this.verifyPassword()) {
      let subs = this.state.subscriptionTracker;
      let currentSubs = [];
      for (let key in subs) {
        if (subs[key]) {
          currentSubs.push(key);
        }
      }
      const { user_name, email, password } = this.state;

      console.log(
        "In signup... about to go to app level: ",
        user_name,
        email,
        password
      );

      this.updateUserState({
        user_name: user_name,
        email: email,
        password: password,
        watch_list: [],
        watch_history: [],
        is_logged_in: true,
      });

      let goToHome = {
        target: {
          innerHTML: "",
          parentNode: {
            id: "Login-page",
          },
          className: "home",
        },
      };
      this.showModal(goToHome);
    } else {
      console.log("Password mismatch, clear the form data?");
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    let userSetting = e.target.className;
    let value = e.target.value;
    let stateChange = {};

    console.log(userSetting, value);

    switch (userSetting) {
      case "user_name":
        this.setState({ user_name: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "confirm_password":
        this.setState({ confirm_password: value });
        break;
      default:
        console.log("This is the default for the case switch");
    }
  }

  handleStreamSelect(e) {
    // e.preventDefault();
    if (this.state.subscriptionTracker[e.target.value]) {
      this.state.subscriptionTracker[e.target.value] = false;
    } else {
      this.state.subscriptionTracker[e.target.value] = true;
    }

    console.log(
      "These are the this.state.subscriptionTracker: ",
      this.state.subscriptionTracker
    );
  }

  verifyPassword(e) {
    // This is lazy but it will work for now
    console.log("Testing: ", this.state.password !== "");
    if (
      this.state.password !== this.state.confirm_password ||
      this.state.password === ""
    ) {
      alert("Password missing or does not match.");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <div>
          <form id="signup-input-container">
            <input
              id="stream-input-at-signup"
              className="user_name"
              type="text"
              placeholder="User Name"
              onChange={this.handleInputChange}
            />
            <input
              id="stream-input-at-signup"
              className="password"
              type="password"
              autoComplete="on"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <input
              id="stream-input-at-signup"
              className="confirm_password"
              type="password"
              autoComplete="on"
              placeholder="Confirm Password"
              onChange={this.handleInputChange}
            />
            <input
              id="stream-input-at-signup"
              className="email"
              type="text"
              placeholder="Email Address"
              onChange={this.handleInputChange}
            />
            <input
              // id="stream-input-at-signup"
              type="submit"
              value="Submit"
              onClick={this.handleSubmitClick}
            />
          </form>
        </div>

        <div className="StreamButtonAtSignUp">
          {this.state.services.map((service) => (
            <ServiceButton
              handleStreamSelect={this.handleStreamSelect}
              key={service}
              service={service}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Signup;

document.getElementById("Main");
