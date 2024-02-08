const express = require("express") //iniciando o express

const router = express.Router() //configurando a primeira parte da rota

const { v4: uuidv4 } = require('uuid'); //iniciando a biblioteca uuid


const app = express()//iniciando o app
app.use(express.json()) // tratando os dados que vão trafegar a partir da requisição em formato Jsoon

const porta = 3333 //criando a porta

// criando lista incial de mulheres
const listaMulheres = [

    {
        id: '1',
        nome: 'Simara Conceição',
        imagem: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora e instrutora'

    },

    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'CEO & Founder da PrograMaria'

    },

    {
        id: '3',
        nome: 'Luana Pimentel',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Senior Staff Software Engineer'

    }
]

// GET
function mostraMulheres(request, response) {
    response.json(listaMulheres)
}

// POST
function criaMulher(request, response) {
    const novaMulher = {

        id: uuidv4(),     
        nome: request.body.nome,     
        imagem: request.body.imagem,     
        minibio: request.body.minibio 

      }

    listaMulheres.push(novaMulher);

    response.json(listaMulheres)
}

// PATCH

function corrigeMulher (request, response) {
    function encontraMulher (mulher) {
        if(mulher.id === request.params.id) {
            return mulher
        };
    };

    const mulherEncontrada = listaMulheres.find(encontraMulher)

    if(request.body.nome) {mulherEncontrada.nome = request.body.nome};
    if(request.body.imagem) {mulherEncontrada.imagem = request.body.imagem};
    if(request.body.minibio) {mulherEncontrada.minibio = request.body.minibio}

    response.json(listaMulheres);
}

// função mostra a porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}


app.use(router.get('/mulheres', mostraMulheres)) // segunda parte da configuração da rota - usando GET para '/mulheres'
app.use(router.post('/mulheres', criaMulher)) // 2ª parte da config. da rota - usando POST para '/mulheres'
app.use(router.patch('/mulheres/:id', corrigeMulher)) // 2ª parte da config. da rota - usando PATCH para '/mulheres:id'
app.listen(porta, mostraPorta) //servidor ouvindo a porta