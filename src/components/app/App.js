import React, { useState } from "react";
import "./App.css";
import GitRepositories from "../gitRepositories/GitRepositories";
import SearchForm from "../searchForm/SearchForm";


const App = () => {
  const [nameRepositorie, setNameRepositorie] = useState('');

  const handleSearchRepositories = (event, value) => {
    event.preventDefault(); // Prevent submit from reloading the page
    setNameRepositorie(event.target.inputSearchText.value); //Recebe o retorno do input de texto do form e seta no state
  };

  return (
    <div className="App">
      <SearchForm handleSearchRepositories={handleSearchRepositories} />
      <GitRepositories nameRepositorie={nameRepositorie} />
    </div>
  );
};

export default App;
