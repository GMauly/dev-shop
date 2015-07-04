## Objetivo

Criar o carrinho de compras de uma loja que vende desenvolvedores baseado no exemplo fornecido.

![Imgur](http://i.imgur.com/8NPz67T.png)

## Tarefas e priorização

Priorizei a lista de tarefas da seguinte maneira:

* Popular a lista de desenvolvedores a partir de uma organização do GitHub.
  * Fácil de ser implementado e tinha sentido estar junto com a tarefa abaixo
* Determinar o preço do desenvolvedor a partir de informações do seu perfil do GitHub, como por exemplo: followers, repos, stars, commits, etc.
  * Pois achei importante a definição dos preços de maneira consistente como informativo. Me arrependo pois para obter estas informações é necessário fazer diversas requisições à API do github, o que acaba com o número de requisições permitidas e causa a aplicação a trava esperando resposta do github.
* Substituir os inputs de texto por uma lista de desenvolvedores com nome, foto, preço e um botão de "Adicionar ao carrinho".
  * Devido a usabilidade
* Permitir a escolha de quantidade de horas contratadas de cada desenvolvedor
  * Por achar importante como idéia do sistema, para tentar esboçar ao máximo como a aplicação real se comportaria

## Server side

Usei Node.js para desenvolver todo o sistema. Fazendo o carrinho baseado em sessão não havia muito motivo para persistencia do carrinho.
Abandonei os testes depois de ter problemas com minha conexão com a internet que me fizeram perder muito tempo.