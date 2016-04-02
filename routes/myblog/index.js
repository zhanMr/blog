'use strict';
const express = require('express');
const router = express.Router();
const db = require('../../service/db');

//### 后台首页
router.get('/index', (req, res) => {
    res.render('myblog/index', { title: '后台'});
});
//### 后台首页 end

//### 文章列表
router.get('/detail', (req, res) => {
    res.render('myblog/detail', { title: '后台'});
});
//### 文章列表 end

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
    let sql = 'delete from message where id =' + req.body.id;
    db(sql, (err, rows, fields) => {
        res.json({
            data: rows
        })
    })
});
//### 留言 end

//登录首页
router.get('/login', (req, res)=>{
    res.render('myblog/login', { title: '登录'});
});
//登录验证
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = toolFun.encrypt(req.body.password, 'sha1');
    let sql = "select * from login where  username = '" + username + "' and password = '" + password + "'";
    let success = false;
    db(sql, (err, rows, fields) =>{
        if(!err && rows.length){
            //记录登录时间
            let time = new Date().getTime();
            //设置缓存有效期一天
            let stamp = time +  86400000;
            //httpOnly 只能服务端读取cookie
            //expires 缓存过期时间
            let cookieObj = {httpOnly: true, expires: new Date(stamp)};
            db("update login set time = " + time + " where username = '" + username + "'", (uerr, urows,ufields)=>{
                if(!uerr){
                    res.cookie("pass", password, cookieObj);
                    res.cookie("time", time, cookieObj);
                    success = true;
                }else{
                    success = false;
                }
                res.json({
                    success: success
                })
            });
        }else{
            res.json({
                success: success
            })
        }
    });
});

module.exports = router;
