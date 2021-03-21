import React, { Component } from "react";
import LoginForm from "./LoginForm";
import CardElement from "./CardElement";
//import RunElement from "./RunElement";
import axios from "axios";
const uuid = require("uuid").v4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existingUser: false,
      athlete: null,
      sessionId: localStorage.getItem("session_id"),
      stats: {
        ytd_run_totals: {
          count: 0,
          distance: 0,
          elapsed_time: 0,
          elevation_gain: 0,
          moving_time: 0,
        },

      },
    };
  }

  componentDidMount() {
    console.log(this.state.sessionId);
    this.attemptToLogInToBackend();
  }

  handleAuthenticationClick = async () => {
    console.log("button clicked")
    await this.loginToNewSession();
  };

  attemptToLogInToBackend = () => {
    if (this.state.sessionId !== null) {
      this.loginToExistingSession();
    } else {
      this.setSessionCookie(uuid());
      this.setState({ sessionId: localStorage.getItem("session_id") });
    }
  };

  setSessionCookie = (id) => {
    localStorage.setItem("session_id", id);
  };



  loginToExistingSession = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/authentication/login/${this.state.sessionId}`,
      });
      let user = response.data.user
      if (user.existing_user) {
        this.setState(
          { existingUser: user.existing_user,
          athlete: user.athlete}
          );
        await this.getAthleteData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  loginToNewSession = async () => {
    console.log("new session method ran")
    try {
      const response = await axios({
        method: "get",
        url: `/api/authentication/login/${this.state.sessionId}`
      });
      window.open(response.data, "_self");
    } catch (error) {
      console.log(error);
    }
    console.log('New session method finished running')
  };

  getAthleteData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/athlete/stats/${this.state.sessionId}`,
      });
      console.log(response.data);
      this.setState(
        { stats: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  getHoursAndMinutes = (time) => {
    return time/3600
  }

  render() {
    let dashboard = null;
    if (this.state.existingUser) {
      dashboard = (
        <div>
          <div>
            <h1 className="welcome">Hello, {this.state.athlete.firstname}!</h1>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <CardElement 
              cardTitle="Distance"
              cardData={this.state.stats.ytd_run_totals.distance / 1000}
              decimalLength={2}
              units="km"
              />
              
            </div>
            <div className="col-sm-4">
              <CardElement 
              cardTitle="Number of Runs"
              cardData={this.state.stats.ytd_run_totals.count}
              decimalLength={0}
              />
            </div>
            <div className="col-sm-4">
              <CardElement 
              cardTitle="Time"
              cardData={this.getHoursAndMinutes(this.state.stats.ytd_run_totals.moving_time)}
              decimalLength={2}
              units="Hours"
              />
            </div>
          </div>
        </div>
      );
    } else {
      dashboard = (
        <div className="strava-login">
          <LoginForm click={this.handleAuthenticationClick} />
        </div>
      );
    }

    return (
      <div className="App container">
        <h3>Strava Dashboard</h3>
        {dashboard}
      </div>
    );
  }
}

export default App;