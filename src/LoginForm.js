import React from "react";

const loginForm = (props) => {
  return (
    <div className="card shadow-lg w-50 p-2 mx-auto">
      <img className="card-img-top login-img" src="/img/stairs.jpg" alt="person in running shoes on stone steps"/>
      <div className="card-body">
      <h5 className="card-title">Connect to Strava</h5>
        <button className="btn-warning btn" type="submit" onClick={props.click}>
          Link Strava
        </button>
      </div>
      
      
    </div>
        
  );
};
export default loginForm;
