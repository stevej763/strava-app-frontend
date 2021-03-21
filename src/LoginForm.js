import React from "react";

const loginForm = (props) => {
  return (
    <div className="card login-card shadow-lg">
      <img className="login-img card-img-top" src="/img/stairs.jpg" alt="person in running shoes on stone steps"/>
      <div className="card-body">
      <h5 className="card-title">Login to Strava to see your stats</h5>
        <button className="btn-warning btn" type="submit" onClick={props.click}>
          Link Strava
        </button>
      </div>
      
      
    </div>
        
  );
};
export default loginForm;
