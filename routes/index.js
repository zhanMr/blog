'use strict';
let express = require('express');
let router = express.Router();
let fs = require('fs');
router.get('/', function(req, res) {
    fs.readdir(__dirname, function(err, data){
        res.render('index', { title: 'My!!!!!!!!', data: data});
    });
});
module.exports = router;
