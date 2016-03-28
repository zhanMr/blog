'use strict';
let express = require('express');
let router = express.Router();
let db = require('../service/db');
let os = require('os');
router.get('/', function(req, res) {
    res.render('message', { title: '留言'});
});
router.post('/message', function(req, res) {
    let sql = "insert into message (message, os, time) values('" + req.body.message + "','" + os.type() + "','" + new Date() + "')";
    db(sql, function(err, rows, fields){
        console.log(err);
        res.json({
            success: true
        })
    });

});
module.exports = router;
