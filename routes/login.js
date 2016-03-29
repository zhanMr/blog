'use strict';
let express = require('express');
let router = express.Router();
let db = require('../service/db');
let tool = require('../service/tool');
let toolFun = new tool();

//登录首页
router.get('/', (req, res)=>{
    res.render('login', { title: '登录'});
});


//登录验证
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = "select * from login where  username = '" + username + "' and password = '" + password + "'";
    db(sql, (err, rows, fields) =>{
        if(!err && rows.length){
            //记录登录时间
            let time = new Date().getTime();
            let stamp = time + 900000;
            //httpOnly 只能服务端读取cookie
            //expires 缓存过期时间
            let cookieObj = {httpOnly: true, expires: new Date(stamp)};
            db("update  login set time = " + time + " where username = '" + username + "'", function(){});
            res.cookie("name", toolFun.encrypt(username, 'md5'), cookieObj);
            res.cookie("time", toolFun.encrypt(stamp,'md5'), cookieObj);
        }
        res.json({
            success: !err ? !!rows.length : false
        })
    });
});

module.exports = router;
