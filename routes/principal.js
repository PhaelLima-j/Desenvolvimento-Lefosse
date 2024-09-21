const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    res.render('paginas/login/index')
});

module.exports = router;