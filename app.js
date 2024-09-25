require('dotenv').config();

const express = require('express')
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const passport = require('passport');

require('./routes/oauth/')
const routerAuth = require('./routes/auth');
const routerHome = require('./routes/home');

const { checaAutenticado } = require('./routes/middlewares/checa-autenticacao');

const { connect } = require('./models')

const app = express();
const porta = 3000;

// configurando a leitura do corpo
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnintialized: false
}))

// configurando autenticacao
app.use(passport.initialize());
app.use(passport.session());

// configurando ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configurando arquivos estaticos
app.use(express.static('public'));

// routers
app.use('/login', routerAuth);
app.use('/home', checaAutenticado, routerHome);

// caso nao de match em nenhuma rota, tratamos o 404
app.use((_req, _res, next) => {
    next(createError(404));
});

// trativa de erro
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.render('paginas/erro', {
    mensagem: err.message,
        erro: err,
    });
});  

app.listen(porta, () => {
    connect();

    console.log('Servidor ouvindo na porta ' + porta);
});