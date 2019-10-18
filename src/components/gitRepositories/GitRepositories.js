import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Table, Alert } from "react-bootstrap";
import "./GitRepositories.css";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const GitRepositories = props => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [alertOptions, setAlertOptions] = useState({ visibleAlert: false, text: '', color: 'info' });
  const [spanSelect, setSpanSelect] = useState(<FaArrowDown />);
  const [columnsTable] = useState(['name', 'private', 'html_url', 'description', 'language']);
  const [filterSelect, setFilterSelect] = useState({
    filter: "name",
    orderAsc: true
  });

  const url_fetch = `https://api.github.com/users/${props.nameRepositorie}/repos`;//url para pegar o projeto na api

  //Atualiza a tabela
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

      //verifica se existe o usuario ou a conta nao tem projetos
      (response.message == "Not Found") ? //verifica se existe o usuario
        onShowAlert('warning', "Conta do github não encontrada!")
        : //else
        response == "" ? //verifica se o usuario tem projetos
          // alert("Usuário não tem projetos!")
          onShowAlert('info', "Conta não possui nenhum projeto!")
          : //else
          setRepositories(filterOrderBy(response)); //adiciona os projetos na lista


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
    changeSpanOrder(theadChange); //chama a funcao para trocar o icone de ordenacao
    setFilterSelect((filterSelect.filter = theadChange)); //diz quem e coluna de ordenacao selecionada
    setRepositories(filterOrderBy(repositories)); //troca a ordenação do filtro;
  };

  //troca o icone de ordenacao ASC ou DESC
  const changeSpanOrder = () => {
    (filterSelect.orderAsc) ?
      setSpanSelect(<FaArrowDown />)
      :
      setSpanSelect(<FaArrowUp />)
  };

  // troca o filtro para asc ou desc
  const handleFilterOrderBy = () => {
    const newFilterOrderBy = [filterSelect].map(param => {
      return { ...param, orderAsc: !param.orderAsc };
    });
    setFilterSelect(newFilterOrderBy[0]);
    return filterSelect.orderAsc;
  };



  //Mostrta o alert de sucesso durante 2seg, depois seta aos valores default
  const onShowAlert = (color, text) => {
    setAlertOptions({ visibleAlert: true, text, color });
    setTimeout(() => {
      setAlertOptions({ visibleAlert: false, text: '', color: 'info' })
    }, 2000);
  }

  return (
    <>
      <div className="alert-div">
        <Alert variant={alertOptions.color} show={alertOptions.visibleAlert} >
          {alertOptions.text}
        </Alert> {/* Component para exibir a mensagem de alert sucesso ou falha */}
      </div>

      {/* se o state repositories estiver preenchido, mostra o conteudo da tabela */}
      {repositories != "" ? (
        <>
          <Loading value={loading} />
          <Table striped hover responsive>
            <thead>
              <tr>
                {/* Para cada item no state, carrega as colunas thead */}
                {columnsTable.map(column => (
                  <th key={column} onClick={() => changeFilterOrderBy(column)}>
                    {column === 'name' ? 'Project' : null}  {/* Correcao nome da th */}
                    {column === 'private' ? 'Private' : null} {/* Correcao nome da th */}
                    {column === 'html_url' ? 'URL' : null} {/* Correcao nome da th */}
                    {column === 'description' ? 'Description' : null}{/* Correcao nome da th */}
                    {column === 'language' ? 'Language' : null} {/* Correcao nome da th */}
                    {filterSelect.filter == column ? spanSelect : null}{/* ICONE DE ORDENACAO */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Para cada projeto, carrega as td na tabela com as colunas passadas no state */}
              {repositories.map(repo => (
                <tr key={repo.id}>
                  {columnsTable.map(column => (
                    <td key={column}>
                      {/* private é um booleano, por isso a conversao em string */}
                      {column === 'private' ? String(repo[column]) : repo[column]} 
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}

    </>
  );
};

export default GitRepositories;
