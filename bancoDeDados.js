const mongoose = require('mongoose'); // importando a biblioteca mongoose;

async function conectaBancoDeDados () {

    try {

        console.log('A conexão iniciou')

        await mongoose.connect('mongodb+srv://ednirlicosta:4twZ1AkPJlylR1Hc@clustermulheres.pygwl8x.mongodb.net/?retryWrites=true&w=majority')
    
        console.log('Conexão com banco de dados foi bem sucedida.')
    } catch (error) {
        console.log(`Houve um erro na conexão ${error}`)
    }
}

module.exports = conectaBancoDeDados;