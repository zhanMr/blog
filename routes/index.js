'use strict';
let express = require('express');
let router = express.Router();
let db = require('../service/db');

// /(index|^\/$)/ 匹配/和/index
router.get(/(index|^\/$)/, function(req, res) {
    let page = parseInt(req.query.page) || 1;
    let num = 3;
    let sql = 'select * from content limit ' + (page - 1)*num + ',' + ((page - 1)*num + 6);
    db(sql, function(err, rows, fields){
        res.render('index', { title: '首页' , data: rows, page: page, total: 100});
    })
});
module.exports = router;
