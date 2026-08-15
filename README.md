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
