import React from "react";
import "./Loading.css";

const Loading = props => {
  return (
    <>
      {props.value ? (
        <div className="loading">
          <div>{/*loader*/}</div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
