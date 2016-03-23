'use strict';
let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', function(req, res) {
    fs.readFile('./alt/alt.js', (err, data) =>{
        if (err) throw err;
        var dd = new Buffer(data);
        console.log(JSON.parse(JSON.stringify(dd)));
        res.render('index', { title: '首页', data: data.toString()});
    })
});
module.exports = router;
