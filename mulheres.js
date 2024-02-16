const express = require("express"); //iniciando o express

const router = express.Router(); //configurando a primeira parte da rota

// const { v4: uuidv4 } = require("uuid"); //iniciando a biblioteca uuid // quando conectamos o banco de dados do MongoDb essa biblioteca não se fez mais necessária

const cors = require('cors'); // importando cors para liberar a consumir a API com o front

const conectaBancoDeDados = require("./bancoDeDados"); // importando o módulo de conexão do banco de dados
conectaBancoDeDados(); // chamando a função para rodar o banco de dados

const Mulher = require("./mulherModel"); // importando as regras de modelagem do objeto mulher no banco de dados

const app = express(); //iniciando o app
app.use(express.json()); // tratando os dados que vão trafegar a partir da requisição em formato Json
app.use(cors()); // liberando a API para ser usada na frontend

const porta = 3333; //criando a porta

// criando lista incial de mulheres
// const listaMulheres = [

//     {
//         id: '1',
//         nome: 'Simara Conceição',
//         imagem: 'https://bit.ly/3LJIyOF',
//         minibio: 'Desenvolvedora e instrutora'

//     },

//     {
//         id: '2',
//         nome: 'Iana Chan',
//         imagem: 'https://bit.ly/3JCXBqP',
//         minibio: 'CEO & Founder da PrograMaria'

//     },

//     {
//         id: '3',
//         nome: 'Luana Pimentel',
//         imagem: 'https://bit.ly/3FKpFaz',
//         minibio: 'Senior Staff Software Engineer'

//     }
// ]

// GET
async function mostraMulheres(request, response) {
  try {
    const listaMulheresDoBancoDeDados = await Mulher.find();

    response.json(listaMulheresDoBancoDeDados);
  } catch (error) {
    console.log(error);
  }
}

// POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  });

  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (error) {
    console.log(error);
  }
}

// PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }
    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }
    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizaNoBancoDeDados);
  } catch (error) {
    console.log(error);
  }
}

// DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ message: "Mulher deletada com sucesso!" });
  } catch (error) {
    console.log(error);
  }
}

// função mostra a porta
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get("/mulheres", mostraMulheres)); // segunda parte da configuração da rota - usando GET para '/mulheres'
app.use(router.post("/mulheres", criaMulher)); // 2ª parte da config. da rota - usando POST para '/mulheres'
app.use(router.patch("/mulheres/:id", corrigeMulher)); // 2ª parte da config. da rota - usando PATCH para '/mulheres:id'
app.use(router.delete("/mulheres/:id", deletaMulher)); // 2ª parte da config. da rota - usando DELETE para '/mulheres:id'
app.listen(porta, mostraPorta); //servidor ouvindo a porta
