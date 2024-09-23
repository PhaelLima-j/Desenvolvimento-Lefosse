const mongoose = require ('mongoose');

const UsuarioSchema = require('./usuario');

const Usuario = mongoose.model('Usuario', UsuarioSchema);

const connect = () => {
    mongoose.connect(process.env.MONGO_URL);
};

module.exports = {
    Usuario,
    connect,
};