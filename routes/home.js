const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    res.render('paginas/home/home.ejs');
});

module.exports = router;