import React from "react";

const logout = (props) => {
  return (
        <div>
            <button className="btn-warning btn" type="submit" onClick={props.click}>Logout</button>
        </div>
        
  );
};
export default logout;
