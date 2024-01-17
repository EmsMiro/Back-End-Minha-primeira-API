const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`);
}

function mostraOla (request, response) {
    response.send("Hello world!");
}

app.use(router.get('/ola', mostraOla));
app.listen(porta, mostraPorta);