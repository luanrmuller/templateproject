# TempleateProject
StartProject

## BACKEND

### Criar a pasta do projeto ex: backend

- $ mkdir backend
- $ cd backend

### Para inicializar o projeto execute o comando:

- $ npm init -y

### Instalar dependencias

- $ npm install nodemon -D
- $ npm install supertest -D
- $ npm install jest -D
- $ npm install express
- $ npm install cors
- $ npm install celebrate
- $ npm install cross-env

### Ajustar os scripts de inicialização do projeto

    "scripts": {
        "start": "nodemon src/server.js",
        "test": "cross-env NODE_ENV=test jest"
      }

### Acessar o projeto

- $ code .

## FRONTEND

### Para inicializar o projeto execute o comando:

- $ npx create-react-app frontend

### Acessar a pasta do projeto ex: frontend

- $ cd frontend

### Acessar o projeto

- code .


### Instalar dependencias

- $ npm install react-router-dom
- $ npm install react-icons

### Inicializar o projeto

- $ npm start

### Remover os arquivos:

-  readme.md
-  App.css
-  App.test.js
-  index.css
-  logo.svg
-  serviceWorker.js
-  setupTests.js

### Remover importações nao utilizadas no arquivo index.js

-  index.css
-  serviceWorker
 
 
### Remover importações nao utilizadas no arquivo app.js
 
-  App.css
-  logo.svg

### No app.js
Alterar o return para  return( <h1>Hello world</h1>)
 
