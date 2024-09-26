const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const { Usuario } = require('../../models');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (nomeDeUsuario, senha, done) => {
    try {
        const usuario = await Usuario.findOne({ email: nomeDeUsuario }).select('+senha');
        
        if (!usuario) {
            return done(null, false, {message: "Usuário não encontrado "});
        }

        const aSenhaEstaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (aSenhaEstaCorreta) {
            return done(null, usuario);
        } else {
            return done(null, false);
        }
    } catch (err) {
        done (err, false);
    }
    
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
    let err, usuario;

    try {
        usuario = await Usuario.findById(id);
    } catch (err) {
        err = err;
    }
    
    done(err, usuario);
})