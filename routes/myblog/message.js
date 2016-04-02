'use strict';
const express = require('express');
const router = express.Router();
const db = require('../../service/db');

//### 留言
router.get('/message', (req, res) => {
    res.render('myblog/message', { title: '首页'});
});
//获取留言
router.post('/message', (req, res) => {
    let sql = 'select * from message';
    db(sql, (err, rows, fields) => {
        res.json({
            data: rows
        })
    })
});
//删除留言
router.post('/message/remove', (req, res) => {
    let sql = 'delete from message where id = ' + req.body.id;
    db(sql, (err, rows, fields) => {
        console.log(err);
        res.json({
            data: rows
        })
    })
});
//### 留言 end


module.exports = router;