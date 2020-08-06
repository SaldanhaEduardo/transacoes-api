//iniciar express e uuidv4
const express = require("express");
const {uuid} = require("uuidv4");
const app = express();
app.use(express.json());

// criar o array de transações
//começar pelo POST - a rota deve receber title, value, type, income/outcome.
//fazer a lista do GET com todas os POSTs criados, somando um total com os valores(value) no final.
//PUT-DELETE - edita, deleta - respectivamente.
//iniciar MIDDLEWARES.

//iniciar a porta do insomnia

const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});