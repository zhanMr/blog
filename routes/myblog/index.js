'use strict';
const express = require('express');
const router = express.Router();


//### 后台首页
router.get('/index', (req, res) => {
    res.render('myblog/index', { title: '后台'});
});
//### 后台首页 end
module.exports = router;
