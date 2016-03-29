'use strict';
const express = require('express');
const router = express.Router();
const db = require('../service/db');
const os = require('os');

router.get('/', (req, res) => {
    res.render('message', { title: '留言'});
});

//提交留言
router.post('/message', (req, res) => {
    let sql = "insert into message (message, os, time) values('" + req.body.message + "','" + os.type() + "','" + new Date() + "')";
    db(sql, (err, rows, fields) => {
        res.json({
            success: true
        })
    });

});

module.exports = router;
