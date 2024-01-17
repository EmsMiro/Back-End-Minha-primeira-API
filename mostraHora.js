const express = require('express');

const porta = 3333;
const router = express.Router();
const app = express();

const mostraHora = (request, response) => {
    const data = new Date();
    const hora = data.toLocaleTimeString('pt-BR');
    response.send(hora);
}

app.listen(porta);
app.use(router.get('/hora', mostraHora));
