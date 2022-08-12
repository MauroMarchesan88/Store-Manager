# Boas-vindas ao repositório do Projeto Store Manager! 

<summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary>

  Você vai desenvolver sua primeira API utilizando a arquitetura MSC (model-service-controller)!

  A API a ser construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

<br />

# Orientações

<details>
  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary>

  ## 👉 Com Docker

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
  - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

  >  :information_source: Use o comando `docker exec -it store_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`

  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  ![sequelize test](./public/remote-container.png)

 <br />

  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **:warning: Atenção:** Não esqueça de renomear/configurar o arquivo `.env.example` para os testes locais funcionarem.
  - **:warning: Atenção:** Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `Node.js` instalado em seu computador.
  - **:warning: Atenção:** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito a chave `engines` no arquivo `package.json`

  <br/>
</details>

<details>
  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  > :information_source: IMPORTANTE

  - Usaremos o [Jest](https://jestjs.io/pt-BR/) e o [Frisby](https://docs.frisbyjs.com/) para fazer os testes de API.
  - Na seção [Informações Importantes](#informacao-importante), está especificado como a conexão deve ser feita, para que os testes rodem.
  - Este projeto já vem configurado e com suas dependências.
  - Para poder executar os testes basta executar comando `npm test` *(lembre-se de que se estiver usando Docker, rodar esse comando dentro do container)*

  ### :eyes: De olho na Dica: executando os testes

  Para este projeto você pode rodar os testes das seguintes maneiras.
  - Executando todos: `npm test`
  - Executando um por vez: `npm test req02`
  - **:warning: Atenção:** lembre-se de que se estiver usando Docker, rodar esse comando dentro do container.

  <br />
</details>

<details>
  <summary><strong>🎛 Linter</strong></summary>

  Usaremos o [ESLint](https://eslint.org/) para fazer a análise estática do seu código.

  Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivos `package.json`.

  Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

  Você pode também instalar o plugin do `ESLint` no `VSCode`, basta baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e instalá-lo

  <br />
</details>

<details>
  <summary id="informacao-importante"><strong>⚠️ Informações importantes sobre o projeto</strong></summary>

  - A pessoa usuária, independente de cadastro, deve conseguir:
    - Adicionar, ler, deletar e atualizar produtos;
    - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;
    - Ler, deletar e atualizar vendas.

  - Para **todos os endpoints** garanta que:
    - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na sua requisição, sua API deve retornar o status HTTP adequado com o body `{ message: <mensagem de erro> }`;
    - Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não;
    - Garanta que seus endpoints sempre retornem os códigos de status corretos *(recurso criado, erro de validação, autorização, etc)*.
    - Use os verbos HTTP adequados para cada operação;
    - Agrupe e padronize suas URL em cada recurso;

  - Cada camada da sua API deve estar em seu respectivo diretório:
    - A camada **Models** deve estar no diretório de nome `models`;
    - A camada **Services** deve estar no diretório de nome `services`;
    - A camada **Controllers** deve estar no diretório de nome `controllers`;
    - Os **Middlewares** devem estar no diretório de nome `middlewares`.

  **:warning: Atenção:** Os diretórios já estão criados, não altere os nomes, não os mova de lugar e nem os deixe vazios. Você pode criar mais diretórios como `utils`, `helpers`, `database`... entre outros, mas não alterar os citados acima.

  - Em suas models:
    - Colocar o nome do banco de dados antes do nome da tabela, **ex: `banco_de_dados.tabela`**;
    - Atente-se a detalhes de digitação em seu código. Qualquer diferença em nomes, apelidos, CAIXA ALTA ou caixa baixa podem invalidar suas respostas.
    ```SQL
      -- exemplo de escrita de query
      SELECT * FROM StoreManager.products;
    ```

  ---

  ### :warning: Atenção aos arquivos de variáveis de ambiente

  - Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:
    ```sh
      MYSQL_HOST=localhost
      MYSQL_USER=nome
      MYSQL_PASSWORD=1234
      MYSQL_DATABASE=StoreManager
      PORT=3000
    ```
    - **Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**
      - A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente tanto na máquina local quanto no avaliador.
    - Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
    Como o arquivo `.env` não será enviado para o GitHub (não se preocupe com isso, pois já está configurado no `.gitignore`), o avaliador utilizará as suas próprias variáveis de ambiente.
    ```javascript
    require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

      const connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'StoreManager',
      });
    ```

  <br />
</details>

<details>
  <summary id="diagrama-scripts"><strong>🎲 Diagrama ER, Entidades e Scripts</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a manipulação das tabelas, utilize o DER a seguir:

  ![DER](./public/erStoreManager.png)

  ---

  #### Tabelas

  O banco terá três tabelas: 
  - A tabela `products`, com os atributos `id` e `name`;
  - A tabela `sales`, com os atributos `id` e `date`;
  - A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
  - O script de criação do banco de dados pode ser visto [aqui](migration.sql);
  - O script que popula o banco de dados pode ser visto [aqui](seed.sql);

  **:warning: Atenção:** Não exclua, altere ou mova de lugar os arquivos `migration.sql` e `seed.sql`, eles são usados para realizar os testes. Qualquer dúvida sobre estes arquivos procure a monitoria no Slack ou nas mentorias.

  A tabela `products` tem o seguinte formato: *(O id será gerado automaticamente)*

  ![Tabela Produtos](./public/tableproducts.png)

  A tabela `sales` tem o seguinte formato: *(O id e date são gerados automaticamente)*

  ![Tabela Vendas](./public/tablesales.png)


  A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato: *(O produto e a venda são deletados automaticamente)*

  ![Tabela Vendas-Produtos](./public/tablesalesproducts.png)

  ---

  #### Dicas de scripts prontos

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run migration
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run debug
  ```

  - Executar os testes avaliativos da Trybe:
  ```sh
    npm test
  ```

  - Executar os testes de unidade escritos por você:
  ```sh
    npm run test:mocha
  ```

  - Executar o linter:
  ```sh
    npm run lint
  ```

  **:warning: Atenção:** A alteração desses scripts pode impedir o avaliador de funcionar corretamente.

  <br />
</details>

<details id="para-escrever-seus-própios-arquivos-de-teste">
  <summary><strong>🔬 Escrevendo testes de unidade</strong></summary><br />

  - Utilize o **mocha**, **chai** e **sinon** para escrever seus testes;
  - Coloque todos os testes de `models`, `services` e `controllers` dentro da pasta `tests/unit`.
  - **:warning: Atenção:** Os nomes dos arquivos de testes devem seguir essa estrutura `nomeDoArquivo.test.js`
  - **✨ Dica:** Aqui uma sugestão de arquivos para criar os teste de unidade:
  ```tree
  .
  ├─ ...
  ├─ tests
  │   └─ unit
  |       ├─ controllers
  │            ├─ productsControllers.test.js
  │            └─ salesControllers.test.js
  |       ├─ services
  │            ├─ productsServices.test.js
  │            └─ salesServices.test.js
  |       └─ models
  │            ├─ productsModels.test.js
  │            └─ salesModels.test.js
  └─ ...
  ```
  - **✨ Dica:** Aqui como dica, é interessante começar a escrever seus testes de unidade pela camada de `models`. Outra dica é não escrever todos os testes de uma camada só de uma vez! Ex: Crie a função de listar todos os produtos, escreva o teste da camada de `models`, depois `service`, por último `controllers` e vai para a próxima função...

  <br />
</details>
