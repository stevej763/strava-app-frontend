import React from "react";
import CountUp from "react-countup";

const TimeCardElement = (props) => {

    let hours = Math.floor(props.cardData /60 / 60)
    let minutes = Math.floor(props.cardData /60) - (hours * 60)
    let seconds = props.cardData % 60

  return (
    <div className="card stat-card bg-light shadow mb-5 p-3">
      <div className="card-body stat-card-body text-center align-middle">
        <h5 className="card-title"> {props.cardTitle} </h5>
        <h3 className="card-text">
            <CountUp
            end = {hours}
            duration={1}
            decimals={0}
            preserveValue={true}/>
            :
            <CountUp
            end = {minutes}
            duration={2}
            decimals={0}
            preserveValue={true}/>
            :
            <CountUp
            end = {seconds}
            duration={3}
            decimals={0}
            preserveValue={true}/>
        </h3>
      </div>
    </div>
  );
};
export default TimeCardElement;
