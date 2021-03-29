import React from "react";
import CountUp from 'react-countup';

const cardElement = (props) => {
  return (
    <div className="card stat-card bg-light shadow mb-5 p-3">
      <div className="card-body stat-card-body text-center align-middle">
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
