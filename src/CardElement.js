import React from "react";
import CountUp from 'react-countup';

const cardElement = (props) => {
  return (
    <div className="stat-card">
      <div className="card-body">
        <h5 className="card-title"> {props.cardTitle} </h5>
        <h3 className="card-text"><CountUp
            end = {props.cardData}
            duration={2}
            decimals={props.decimalLength}
            preserveValue={true}
            /> {props.units}</h3>
      </div>
    </div>
  );
};
export default cardElement;
