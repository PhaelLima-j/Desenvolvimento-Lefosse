require('dotenv').config();

const express = require('express')
const path = require('path');

const routerPrincipal = require('./routes/principal');
const { connect } = require('./models')

const app = express();
const porta = 3000;

// configurando ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configurando arquivos estaticos
app.use(express.static('public'));

// routers
app.use('/login', routerPrincipal);

app.listen(porta, () => {
    connect();

    console.log('Servidor ouvindo na porta ' + porta);
});