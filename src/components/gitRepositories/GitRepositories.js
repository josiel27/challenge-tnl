import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Table } from "react-bootstrap";
import "./GitRepositories.css";

const GitRepositories = props => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState([false]);
  const url_fetch = `https://api.github.com/users/${props.nameRepositorie}/repos`;

  useEffect(() => {
    setLoading(true);
    async function loadRepositories() {
      const response = await fetch(url_fetch)
        .then(res => {
          return res.json();
        })
        .catch(error => {
          alert(`Erro: ${error}`);
        });

      //verifica se existe o usuario
      response.message == "Not Found"
        ? alert("Conta do GitHub não encontrada!")
        : setRepositories(response);

      //setando o retorno da funcao no state
      setLoading(false);
    }
    //chamando funcao async para carregar os repositorio. Se o props estiver vazio, ela nao executa a funcao
    props.nameRepositorie ? loadRepositories() : setLoading(false);
  }, [props.nameRepositorie]); //toda vez que o nameRepositorie for alterado, ele atualiza a funcao useeffect

  return (
    <>
      {repositories != "" ? (
        <>
          <Loading value={loading} />
          <Table striped hover responsive>
            {/* <Table striped bordered hover> */}
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
                  <td>{repo.html_url}</td>
                  <td>{repo.description}</td>
                  <td>{repo.language}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}

      {
        (console.log(" -- ", repositories, " -- ", props.nameRepositorie),
        repositories == "" && props.nameRepositorie != "" ? (
          <div className="no-repositorie">Conta sem repositórios.</div>
        ) : null)
      }
    </>
  );
};

export default GitRepositories;
