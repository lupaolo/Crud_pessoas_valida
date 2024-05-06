const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let listaPessoas = [
  {
    id: 1,
    nome: "João",
    idade: 20,
    email: "joao@email.com",
    telefone: "61900010002"
  }
];

// Recuperar todas as pessoas
app.get("/pessoas", (req, res) => {
  res.json(listaPessoas);
});

// Recuperar uma pessoa específica por meio de seu identificador
app.get("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = listaPessoas.find(pessoa => pessoa.id === id);
  if (pessoa) {
    return res.json(pessoa);
  }
  return res.status(404).json({ mensagem: "Pessoa não encontrada!" });
});

// Adicionar uma nova pessoa
app.post("/pessoas", (req, res) => {
  const corpo = req.body;

  if (!corpo.nome || !corpo.idade || !corpo.email || !corpo.telefone) {
    return res
      .status(400)
      .json({ mensagem: "Todos os atributos (nome, idade, email, telefone) são obrigatórios" });
  }

  const novaPessoa = {
    id: listaPessoas.length + 1,
    nome: corpo.nome,
    idade: corpo.idade,
    email: corpo.email,
    telefone: corpo.telefone
  };

  listaPessoas.push(novaPessoa);
  return res.status(201).json({
    mensagem: "Pessoa cadastrada com sucesso!",
    pessoa: novaPessoa,
  });
});

// Atualizar uma pessoa existente com base em seu identificador
app.put("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const corpo = req.body;

  if (!corpo.nome || !corpo.idade || !corpo.email || !corpo.telefone) {
    return res
      .status(400)
      .json({ mensagem: "Todos os atributos (nome, idade, email, telefone) são obrigatórios" });
  }

  const index = listaPessoas.findIndex(pessoa => pessoa.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: "Pessoa não encontrada!" });
  }

  const pessoaAtualizada = {
    id: id,
    nome: corpo.nome,
    idade: corpo.idade,
    email: corpo.email,
    telefone: corpo.telefone
  };

  listaPessoas[index] = pessoaAtualizada;

  return res.json({
    mensagem: "Pessoa atualizada com sucesso!",
    pessoa: pessoaAtualizada,
  });
});

// Remover uma pessoa da lista com base em seu identificador
app.delete("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = listaPessoas.findIndex(pessoa => pessoa.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: "Pessoa não encontrada!" });
  }
  listaPessoas.splice(index, 1);
  res.json({ mensagem: `A pessoa com o id ${id} foi removida com sucesso!` });
});

// Middleware para lidar com rotas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ mensagem: "Rota não encontrada!" });
});

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensagem: "Erro interno do servidor!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
