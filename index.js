const express = require("express");
const app = express();

app.use(express.json());

const lista_pessoas = require("./routes/pessoasvad");
app.use(lista_pessoas);

app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000");
});