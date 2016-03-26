'use strict';
let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.render('login', { title: '登录'});
});
module.exports = router;
