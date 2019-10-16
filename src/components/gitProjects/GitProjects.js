import React, { useState, useEffect } from "react";

const GitProjects = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await fetch(
        "https://api.github.com/users/josiel27/repos"
      )
        .then(res => {
          return res.json();
        })
        .catch(error => {
          alert(`Erro: ${error}`);
        });
      console.log(response);
      setRepositories(response); //setando o retorno da funcao no state
    }
    loadRepositories(); //chamando funcao async para carregar os repositorios
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Private</th>
            <th>URL</th>
            <th>Description</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {/* Carrega as tr na tabela */}
          {repositories.map(repo => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{String(repo.private)}</td>
              <td>{repo.url}</td>
              <td>{repo.description}</td>
              <td>{repo.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GitProjects;
