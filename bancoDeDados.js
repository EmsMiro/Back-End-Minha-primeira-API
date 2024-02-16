const mongoose = require('mongoose'); // importando a biblioteca mongoose;
require('dotenv').config() //importando o dotenv

async function conectaBancoDeDados () {

    try {

        console.log('A conexão iniciou')

        await mongoose.connect(process.env.MONGO_URL)
    
        console.log('Conexão com banco de dados foi bem sucedida.')
    } catch (error) {
        console.log(`Houve um erro na conexão ${error}`)
    }
}

module.exports = conectaBancoDeDados;