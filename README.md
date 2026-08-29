# PortfolioAngular

Portfólio pessoal criado para a disciplina Desenvolvimento Web II, futuramente será adicionado novas seções.

## Tecnologias utilizadas

- Node.js: ambiente de execução JavaScript que permite rodar Angular CLI e gerenciar pacotes com npm.
- npm: gerenciador de pacotes do Node, usado para instalar dependências do projeto.
- Angular CLI: ferramenta de linha de comando para criar, desenvolver e fazer build de aplicações Angular.

## Versões das tecnologias

- Node.js: 24.14.0
- npm: 11.9.0
- Angular CLI: 21.2.13

## Configuração do banco de dados

1. Inicei o Mariadb

sudo service mariadb start

2. Crie o banco e as tabelas executando o script:

mariadb -u root -p < sql/setup.sql

## Executando a API

Na raiz do projeto execute:

/usr/bin/php -S 0.0.0.0:8000

A API ficará disponível em:

Na aba PORTS mais especificadamente na porta 8000, basta clicar no icone de globo e acessar /api/projetos.php ou /api/tecnologias.php

## Development server

Para iniciar um server local, rode:

```bash
ng serve
```

Uma vez que seu server está rodando, abra seu navegador e acesse
`http://localhost:4200/`.

## O que foi implementado na aula 16: A casca do portfólio

- Configuração de rotas para as páginas: Início, Sobre, Projetos, Contato.
- Páginas Início e Sobre com textos autorais (trajetória, objetivos no portfólio).
- Menu de navegação com destaque do link ativo usando routerLinkActive.
- Estilização com Angular Material (toolbar, cards, botões).
- O projeto agora está navegável e conta com textos reais.

## 🎯 Autoavaliação aula 17
Conceito pretendido: B

Justificativa (cite o arquivo de cada critério):
- Consumo da API (Projetos): projeto.service.ts (GET via HttpClient) + projetos.ts (subscribe no ngOnInit exibindo os dados na view com @for)
- Catalogo + botao GitHub: tecnologia.service.ts (consumo da API de tecnologias) + catalogo.ts e catalogo.html (exibição com @for, uso de mat-card) + projetos.html com [href]="p.link_github" no botão “Ver no GitHub”
- Boas praticas: URLs centralizadas dentro dos services (projeto.service.ts e tecnologia.service.ts), separação entre camada de serviço (API) e componente (apresentação), uso de HttpClient para comunicação com backend
- Autoavaliacao: esta secao do README

## 🎯 Autoavaliação aula 18/Atividade 14
Conceito pretendido: B

Justificativa (cite o arquivo/linha de cada critério):
- Form reativo + erro por campo: contato.html (mensagens com a condição "invalid && touched") + contato.ts (uso de Validators.required, Validators.minLength(3), Validators.email e Validators.minLength(10)).
- POST via service + tratamento: contato.service.ts (método enviar() com this.http.post<RespostaContato>()) + contato.ts (subscribe com callbacks next e error atualizando as variáveis sucesso e erro).
- Endpoint PHP (php://input, validação, prepared, 201/400): api/contato.php (leitura com file_get_contents('php://input'), validações com filter_var e mb_strlen, prepared statement, respostas HTTP 201 e 400).
- Estados/robustez/UX (DUA): contato.html (labels com for e id, mensagens de erro textuais, sem depender exclusivamente de cor) + contato.ts (estado enviando, botão desabilitado com enviando || form.invalid, form.reset() após sucesso).

## Testes da API (projetos.php)

Para validar o funcionamento do back-end antes da integração com o front-end, executei os seguintes testes com curl:

GET (apenas publicados):

Comando: curl -X GET http://localhost:8000/api/projetos.php

Resposta: [{"id":1,"nome":"Portfolio Pessoal","descricao":"Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.","tecnologias":"PHP, MariaDB, CSS, Git","link_github":"https:\/\/github.com\/usuario\/portfolio","ano":"2026","status":"publicado"},{"id":5,"nome":"API de Clima","descricao":"Microsservico que consome uma API publica e devolve a previsao em JSON.","tecnologias":"PHP, REST","link_github":"https:\/\/github.com\/usuario\/clima","ano":"2026","status":"publicado"},{"id":2,"nome":"Sistema de Biblioteca","descricao":"CRUD de acervo e emprestimos, com busca e relatorios.","tecnologias":"PHP, MariaDB, Bootstrap","link_github":"https:\/\/github.com\/usuario\/biblioteca","ano":"2025","status":"publicado"},{"id":3,"nome":"App de Tarefas","descricao":"Lista de tarefas com categorias, prazos e filtro por status.","tecnologias":"JavaScript, HTML, CSS","link_github":"https:\/\/github.com\/usuario\/tarefas","ano":"2025","status":"publicado"},{"id":14,"nome":"Calculadora de IMC","descricao":"Aplica\u00e7\u00e3o web que calcula o \u00cdndice de Massa Corporal com base no peso e altura, exibindo a classifica\u00e7\u00e3o, abaixo do peso, normal, sobrepeso, etc.","tecnologias":"HTML, CSS, JavaScript","link_github":"","ano":"2025","status":"publicado"},{"id":4,"nome":"Loja Virtual (prototipo)","descricao":"Catalogo de produtos com carrinho e checkout simulado.","tecnologias":"PHP, MariaDB, JavaScript","link_github":"https:\/\/github.com\/usuario\/loja","ano":"2024","status":"publicado"}]

GET (todos):

Comando: curl -X GET "http://localhost:8000/api/projetos.php?todos=1"

Resposta: [{"id":1,"nome":"Portfolio Pessoal","descricao":"Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.","tecnologias":"PHP, MariaDB, CSS, Git","link_github":"https:\/\/github.com\/usuario\/portfolio","ano":"2026","status":"publicado"},{"id":5,"nome":"API de Clima","descricao":"Microsservico que consome uma API publica e devolve a previsao em JSON.","tecnologias":"PHP, REST","link_github":"https:\/\/github.com\/usuario\/clima","ano":"2026","status":"publicado"},{"id":6,"nome":"Jogo da Velha (em construcao)","descricao":"Jogo da velha local - ainda em desenvolvimento.","tecnologias":"JavaScript, HTML","link_github":null,"ano":"2026","status":"rascunho"},{"id":2,"nome":"Sistema de Biblioteca","descricao":"CRUD de acervo e emprestimos, com busca e relatorios.","tecnologias":"PHP, MariaDB, Bootstrap","link_github":"https:\/\/github.com\/usuario\/biblioteca","ano":"2025","status":"publicado"},{"id":3,"nome":"App de Tarefas","descricao":"Lista de tarefas com categorias, prazos e filtro por status.","tecnologias":"JavaScript, HTML, CSS","link_github":"https:\/\/github.com\/usuario\/tarefas","ano":"2025","status":"publicado"},{"id":14,"nome":"Calculadora de IMC","descricao":"Aplica\u00e7\u00e3o web que calcula o \u00cdndice de Massa Corporal com base no peso e altura, exibindo a classifica\u00e7\u00e3o, abaixo do peso, normal, sobrepeso, etc.","tecnologias":"HTML, CSS, JavaScript","link_github":"","ano":"2025","status":"publicado"},{"id":4,"nome":"Loja Virtual (prototipo)","descricao":"Catalogo de produtos com carrinho e checkout simulado.","tecnologias":"PHP, MariaDB, JavaScript","link_github":"https:\/\/github.com\/usuario\/loja","ano":"2024","status":"publicado"}]

POST:

Comando: curl -i -X POST http://localhost:8000/api/projetos.php -H "Content-Type: application/json" -d '{"nome":"Projeto de teste","ano":2026}'

Resposta: HTTP/1.1 201 Created

PUT:

Comando: curl -i -X PUT "http://localhost:8000/api/projetos.php?id=7" -H "Content-Type: application/json" -d '{"nome":"Projeto de teste (editado)","ano":2026}'

Resposta: HTTP/1.1 200 OK

DELETE:

Comando: curl -i -X DELETE "http://localhost:8000/api/projetos.php?id=7"

Resposta: HTTP/1.1 204 No Content

POST SEM NOME:

Comando: curl -i -X POST http://localhost:8000/api/projetos.php -H "Content-Type: application/json" -d '{"ano":2026}'

Resposta: HTTP/1.1 400 Bad Request     {"erro":"Informe pelo menos o nome do projeto"}

DELETE COM ID INEXISTENTE:

Comando: curl -i -X DELETE "http://localhost:8000/api/projetos.php?id=9999"

Resposta: HTTP/1.1 404 Not Found    {"erro":"Projeto nao encontrado"}

VERBO NÃO TRATADO:

Comando: curl -i -X POST http://localhost:8000/api/projetos.php

Resposta: HTTP/1.1 405 Method Not Allowed   {"erro":"Informe pelo menos o nome do projeto"}

## Por que o mesmo endereço api/projetos.php atende a quatro operações?

O PHP identifica o método HTTP da requisição $_SERVER['REQUEST_METHOD'] e, com base nele, executa o bloco de código correspondente, seja para listar, criar, atualizar ou excluir projetos. Dessa forma, um único arquivo gerencia todo o CRUD.

## Antecipação de erro: clique duplo em "Adicionar projeto"

Se o usuário clicar duas vezes rapidamente no botão "Adicionar projeto", o estado "salvando" desabilita o botão após o primeiro clique, impedindo que uma segunda requisição seja enviada. Assim, o POST é executado uma única vez, evitando a criação de projetos duplicados no banco.

## Comparação do recarregar e do remover

No salvamento, a lista é recarregada do servidor com carregar() para garantir que todos os dados estejam atualizados. Já na exclusão, o item é removido localmente com filter, proporcionando feedback imediato ao usuário e evitando uma nova requisição GET.

## Registro de operação de escrita

Ao adicionar um novo projeto pela interface de gestão, a aba Network do DevTools mostra:

- Método: POST
- Status: 201 Created
- Content-Type: application/json

Explicação: O status 201 Created é retornado quando um novo recurso é criado com sucesso, indicando que o servidor gerou um novo registro no banco. Já o 204 No Content, que é usado no DELETE, significa que a exclusão foi bem-sucedida, mas não há conteúdo adicional para retornar.

## Autoavaliação

Conceito pretendido: B

- R1 (API decide pelo verbo): api/projetos.php linhas 23-104 (GET, POST, PUT, DELETE com $_SERVER['REQUEST_METHOD']).
- R1 (erros 400/404/405 testados): README.md  seção "Testes da API (projetos.php)".
- R2 (tela pelo service, sem http. no componente): src/app/gestao/gestao.ts – linha 12 (injeção do ProjetoService).
- R2 (campo status no formulário): src/app/gestao/gestao.html – linhas 28-35 (select com opções "Rascunho" e "Publicado").
- R3 (lista atualiza sem F5): src/app/gestao/gestao.ts – linha 83 (this.carregar(); dentro do next do salvar()).
- R4 (justificativa das 2 linhas): README.md seção "Por que o mesmo endereço api/projetos.php atende a quatro operações?".
- R4 (intercalação Network): README.md seção "Registro de operação de escrita".
- R5 (instruções de execução): README.md seções Executando a API, Development server e Configuração do banco de dados.
- R5 (estados de tela – carregando, erro, lista vazia):
  - src/app/gestao/gestao.html linhas 44-52.
  - src/app/projetos/projetos.html linhas 1, 4 e 7.
- R5 (foco visível por Tab – acessibilidade): src/styles.css linhas 30-43 (regra :focus-visible).
- Autoavaliação: esta seção do README.