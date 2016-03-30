'use strict';
const express = require('express');
const router = express.Router();
const db = require('../service/db');

// /(index|^\/$)/ 匹配/和/index
router.get('/', (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let num = 3;
    let sql = 'select * from content limit ' + (page - 1)*num + ',' + ((page - 1)*num + 6);
    db(sql, (err, rows, fields) => {
        res.render('index', { title: '首页' , data: rows, page: page, total: 100});
    })
});

module.exports = router;
