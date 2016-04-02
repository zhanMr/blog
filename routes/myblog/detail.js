'use strict';
const express = require('express');
const router = express.Router();
const db = require('../../service/db');

//### 文章列表
router.get('/detail', (req, res) => {
    res.render('myblog/detail', { title: '后台'});
});
router.post('/detail', (req, res) => {
    let sql = 'select * from content order by id desc';
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
//文章详情
router.get('/detail_info', (req, res) => {
    res.render('myblog/detail_info', { title: '文章详情'});
});

router.post('/detail_info', (req, res) => {
    let sql = 'select * from content where id = ' + req.body.id;
    db(sql, (err, rows, fields) => {
        console.log(err);
        res.json({
            data: rows
        })
    })
});
router.post('/detail_info/update', (req, res) => {
    let sql, id = req.body.id, title = req.body.title, introduction = req.body.introduction, content = req.body.content;
    if(id == 0){
        //增加记录
        sql = 'insert into content (title, introduction, content) values(\'' + title + '\',\'' + introduction + '\',\'' + content + '\')';
    }else{
        //修改记录
        sql = 'update content set title = \'' + title + '\' , introduction = \'' + introduction  + '\' , content = \'' + content + '\' where id = ' + id;
    }


    db(sql, (err, rows, fields) => {

        res.json({
            data: rows
        })
    })
});
//### 文章列表 end


module.exports = router;
