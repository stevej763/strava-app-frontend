import React from "react";

const loginForm = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5>Click the button to display your Strava dashboard</h5>
        <button className="btn-warning btn" type="submit" onClick={props.click}>
          Link to Strava
        </button>
      </div>
    </div>
  );
};
export default loginForm;
