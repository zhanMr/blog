'use strict';
let express = require('express');
let router = express.Router();
let db = require('../service/db');
router.get('/', function(req, res) {
    res.render('login', { title: '登录'});
});
//登录验证
router.post('/login', function(req, res) {
    let sql = "select * from login where  username = '" + req.body.username + "' and password = '" + req.body.password + "'";
    db(sql, function(err, rows, fields){
        res.json({
            success: !err ? !!rows.length : false
        })
    });
});

module.exports = router;
