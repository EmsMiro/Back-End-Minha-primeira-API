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

function mostraMulher(request, response) {
    response.json({
        nome: 'Emily Miro',
        imagem: 'https://avatars.githubusercontent.com/u/88207749?v=4',
        minibio: 'Programadora Front End'
    });
};

app.use(router.get('/mulher', mostraMulher));
app.listen(porta, mostraPorta);