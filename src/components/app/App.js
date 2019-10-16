import React, { useState } from "react";
import "./App.css";
import GitProjects from "../gitProjects/GitProjects";

const App = () => {
  // function handleSearchRepositories(event) {
  //   console.log(event.target.value);
  // }
  return (
    <div className="App">
      {/* handle={() => handleSearchRepositories(event)} */}
      <GitProjects  />
    </div>
  );
};

export default App;
