import React, { Component } from "react";
import LoginForm from "./LoginForm";
import Logout from "./logout"
import CardElement from "./CardElement";
import TimeCardElement from "./TimeCardElement";
import Activities from "./Activities";
import Loader from "react-loader-spinner";
import axios from "axios";
const uuid = require("uuid").v4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      activities: null
    };
    this.baseState = this.state
  }

  componentDidMount() {
    this.setState({loading:true})
    console.log(this.state.sessionId);
    this.attemptToLogInToBackend();
  }

  handleAuthenticationClick = async () => {
    console.log("button clicked")
    await this.loginToNewSession();
  };

  handleLogout = async () => {
    localStorage.removeItem("session_id")
    this.setState(this.baseState)
    }

  attemptToLogInToBackend = () => {
    if (this.state.sessionId !== null) {
      this.loginToExistingSession();
    } else {
      let newSessionId = uuid()
      this.setSessionCookie(newSessionId);
      this.setState({ sessionId: localStorage.getItem("session_id") });
    }
  };

  setSessionCookie = (newSessionId) => {
    localStorage.setItem("session_id", newSessionId);

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
        await this.getAthleteStats();
        await this.getAthleteActivities();
        this.setState({loading:false})
      } 
    } catch (error) {
      this.setState({existingUser: false})
    }
  };

  loginToNewSession = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/authentication/login/${this.state.sessionId}`
      });
      window.open(response.data, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  getAthleteStats = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/athlete/stats/${this.state.sessionId}`,
      });
      this.setState(
        { stats: response.data });
    } catch (error) {
      console.log(error)
    }
  }

  getAthleteActivities = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/athlete/activities/${this.state.sessionId}`,
      });
      this.setState(
        { activities: response.data });
    } catch (error) {
      
    }
  }

  render() {
    let dashboard = null;
    if (this.state.athlete === null) {
        dashboard = (
          <div className="d-flex justify-content-center">
            <LoginForm click={this.handleAuthenticationClick} />
          </div>
        );
      } else if (this.state.existingUser && this.state.activities !=null) {
      dashboard = (
        <div>
          <div>
            <h1 className="d-flex justify-content-center welcome">Hello, {this.state.athlete.firstname}!</h1>
            <div className="d-flex justify-content-center"> <img className="profile-picture" src={this.state.athlete.profile} alt="profile picture"/></div>
            
            <h3 className="d-flex justify-content-center welcome">Your running stats this year:</h3>
          </div>
          <div className="d-flex justify-content-center align-items-center row">
            
            <div className="col-lg-3 col-sm-12">
              <CardElement 
              cardTitle="Distance"
              cardData={this.state.stats.ytd_run_totals.distance / 1000}
              decimalLength={2}
              units="km"
              />
              
            </div>
            <div className="col-lg-3 col-sm-12">
              <CardElement 
              cardTitle="Run Count"
              cardData={this.state.stats.ytd_run_totals.count}
              decimalLength={0}
              />
            </div>
            <div className="col-lg-3 col-sm-12">
              <TimeCardElement 
              cardTitle="Time"
              cardData={this.state.stats.ytd_run_totals.moving_time}
              decimalLength={2}
              units="Hours"
              />
            </div>
            <div className="col-lg-3 col-sm-12">
              <CardElement 
              cardTitle="Elevation Gain"
              cardData={this.state.stats.ytd_run_totals.elevation_gain}
              decimalLength={0}
              units="m"
              />
            </div>
          </div>
          <div>
        <Activities
        activityData={this.state.activities}
        />
          </div>
          <Logout click={this.handleLogout}/>
        </div>
      )
    } else if (this.state.loading === true) {
      dashboard = (
        <div className="d-flex justify-content-center align-items-center">
          <Loader
          className="dashboard-loader"
          type="Grid"
          color="#fc4c02"
          height={200}
          width={200}
          timeout={3000} //3 secs
        />
        </div>
      )
    } 

    return (
      <div className="App container">
        {dashboard}
      </div>
    );
  }
}

export default App;
