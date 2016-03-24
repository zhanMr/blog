'use strict';
let express = require('express');
let router = express.Router();
let db = require('../service/db');

router.get('/', function(req, res) {
    let id = parseInt(req.query.id) || 1;
    let sql = 'select * from content where id = ' + id;
    db(sql, function(err, rows, fields){

        res.render('detail', { title: '首页' , data: rows});
    })
});
module.exports = router;
