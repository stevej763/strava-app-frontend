import React from "react";

const Activities = (props) => {
  return (
    <div className="bg-light shadow mb-5 p-3">
      <table className="table table-light table-bordered border-primary">
        <thead>
          <tr>
            <th>Activity Title</th>
            <th>Distance</th>
            <th>Moving Time</th>
            <th>Type</th>
            <th>Average Heartrate</th>
            <th>Average Speed</th>
            <th>Estimated Effort</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {props.activityData.map((activity, index) => {
            return <tr key={index}>
                <td>{activity.name}</td>
                <td >{parseFloat(activity.distance/1000).toFixed(2)}</td>
                <td>{parseFloat(activity.moving_time/60).toFixed(2)}</td>
                <td>{activity.type}</td>
                <td>{activity.average_heartrate}</td>
                <td>{activity.average_speed}</td>
                <td>{activity.suffer_score}</td>
                <td>{new Date(activity.start_date).toLocaleDateString()}</td>
                
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Activities;
