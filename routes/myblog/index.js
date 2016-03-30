'use strict';
const express = require('express');
const router = express.Router();


router.get('/index', (req, res) => {
    res.render('myblog/index', { title: '后台'});
});


module.exports = router;
