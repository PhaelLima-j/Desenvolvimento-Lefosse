const express = require('express');
const passport = require('passport');

const { checaAutenticado, checaNaoAutenticado } = require('./middlewares/checa-autenticacao')
const router = express.Router();

router.get('/', checaNaoAutenticado, (req, res) => {
    res.render('paginas/login/index') // {error: req.query.erroNoLogin });
});

router.get('/logout', checaAutenticado, async (req, res) => {
    req.logout(req.user, (err) => {
        if (!err) {
            return res.redirect('/auth');
        } else {
            next(err);
        }
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth'//?erroNoLogin=true
}));


module.exports = router;