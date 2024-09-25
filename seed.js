require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { connect, Usuario } = require('./models');

const populaBancoDeDados = async () => {
    connect();

    await Usuario.create({
        email: 'optz@teste.com.br',
        nome: 'Optimize',
        senha: await bcrypt.hash('Optz@123', 10), 
    });

    await mongoose.disconnect();

};

populaBancoDeDados()

