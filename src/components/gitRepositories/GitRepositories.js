import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Table } from "react-bootstrap";
import "./GitRepositories.css";
import FilterList from "../filterList/FilterList";

const GitRepositories = props => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [spanSelect, setSpanSelect] = useState("name");
  const [filterSelect, setFilterSelect] = useState({
    filter: "name",
    orderAsc: false
  });

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
        : setRepositories(filterOrderBy(response));

      //setando o retorno da funcao no state
      setLoading(false);
    }
    //chamando funcao async para carregar os repositorio. Se o props estiver vazio, ela nao executa a funcao
    props.nameRepositorie ? loadRepositories() : setLoading(false);
  }, [props.nameRepositorie]); //toda vez que o nameRepositorie for alterado, ele atualiza a funcao useeffect

  //Primeiro converte para string para o null evitar o toUpperCase funcionar e depois retorna a lista em ordem crescente
  const filterOrderBy = elements => {
    const filterName = filterSelect.filter;
    let numb = 1;
    handleFilterOrderBy() ? (numb = 1) : (numb = -1);
    return elements.sort((a, b) =>
      String(a[filterName]).toUpperCase() > String(b[filterName]).toUpperCase()
        ? numb
        : numb * -1
    );
  };

  //escolhe qual a coluna será filtrada
  const changeFilterOrderBy = theadChange => {
    changeSpanOrder(theadChange);
    setFilterSelect((filterSelect.filter = theadChange));
    setRepositories(filterOrderBy(repositories)); //troca a ordenação do filtro;
  };

  const changeSpanOrder = thChange => {
    const span = <span>+</span>;
    setSpanSelect(thChange);
    console.log(spanSelect);
    return span;
  };

  // troca o filtro para asc ou desc
  const handleFilterOrderBy = () => {
    const newFilterOrderBy = [filterSelect].map(param => {
      return { ...param, orderAsc: !param.orderAsc };
    });
    setFilterSelect(newFilterOrderBy[0]);
    return filterSelect.orderAsc;
  };

  return (
    <>
      {repositories != "" ? (
        <>
          <Loading value={loading} />
          <Table striped hover responsive>
            {/* <Table striped bordered hover> */}
            <thead>
              <tr>
                <th onClick={() => changeFilterOrderBy("name")}>
                  Project {spanSelect == "name" ? <span>=</span> : null}
                </th>
                <th onClick={() => changeFilterOrderBy("private")}>
                  Private {spanSelect == "private" ? <span>=</span> : null}
                </th>
                <th onClick={() => changeFilterOrderBy("html_url")}>
                  URL {spanSelect == "html_url" ? <span>=</span> : null}
                </th>
                <th onClick={() => changeFilterOrderBy("description")}>
                  Description {spanSelect == "description" ? <span>=</span> : null}
                </th>
                <th onClick={() => changeFilterOrderBy("language")}>
                  Language {spanSelect == "language" ? <span>AS</span> : null}
                </th>
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

      {repositories == "" && props.nameRepositorie != "" ? (
        <div className="no-repositorie">Conta sem repositórios.</div>
      ) : null}

      <FilterList param={repositories} />
    </>
  );
};

export default GitRepositories;
