'use strict';
const express = require('express');
const router = express.Router();
const db = require('../../service/db');

//### 文章列表
router.get('/detail', (req, res) => {
    res.render('myblog/detail', { title: '后台'});
});
router.post('/detail', (req, res) => {
    let sql = 'select * from content';
    db(sql, (err, rows, fields) => {
        res.json({
            data: rows
        })
    })
});
router.post('/detail/remove', (req, res) => {
    let sql = 'delete from content where id = ' + req.body.id;
    console.log(sql);
    db(sql, (err, rows, fields) => {
        res.json({
            data: rows
        })
    })
});
//### 文章列表 end


module.exports = router;
