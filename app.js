require('dotenv').config();

const express = require('express')
const path = require('path');
const createError = require('http-errors');

const routerPrincipal = require('./routes/principal');
const autenticacaoRouter = require('./routes/autenticação');

// importando middlewares
const { checaAutenticacao } = require('./routes/middlewares/checa-autenticacao')

const { connect } = require('./models')

const app = express();
const porta = 3000;

// configurando ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configurando arquivos estaticos
app.use(express.static('public'));

// routers
app.use('/logi', routerPrincipal, checaAutenticacao);
app.use('/autenticacao', autenticacaoRouter, checaAutenticacao);

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