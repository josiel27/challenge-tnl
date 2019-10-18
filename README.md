# Desafio Frontend - The Nine Level


## Objetivo.
Buscar na API do Github todas os projetos por usuário. 

O usuário poderá digitar o nome de um usuário e visualizar o nome do projeto, se ele é público ou privado, url para acesso ao repositório, descrição do projeto e a linguagem de programação utilizada.

* Teste o projeto: [challenge-tnl](https://josiel27.github.io/challenge-tnl/).


## Processo de desenvolvimento

- Primeiro, estruturei os components nas suas respectivas pastas. Em seguida, desenvolvi a tabela e o formulário de pesquisa em componentes separados. Criei um loading para a tabela. O css contou bastante com a ajuda do Bootstrap e foi de suma para a estilização do formulário de pesquisa e tabela com os projetos.


## Desafios encontrados

- Utilizando o React Hooks para a estruturação dos componentes, o maior desafio foi conversar as informações entres esses componentes. 


## Melhorias 

- Problema: O componente GitRepositories.js contém muitas funções e muitas informações centralizadas em um só componente. 
- Solução: Para resolver isso, poderá ser utilizado o Redux do React, permitindo organizar melhor as informações centralizadas e a distribuição dessas informações em todos os componentes do projeto.


## Como usar

Instale o Node.js se precisar: [Como instalar o Node JS](https://medium.com/@adsonrocha/como-instalar-o-node-js-no-windows-10-cf2bd460b8a8).

<ol>
    <li>git clone https://github.com/josiel27/challenge-enext.git</li>
    <li>npm install</li>
    <li>npm start or npm run start</li>
</ol>