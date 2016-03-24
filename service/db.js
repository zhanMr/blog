//数据库链接
'use strict';
let mysql = require('mysql');
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    port: 3306
});
let query = function(sql, callback){
   pool.getConnection(function(err, conn){
       if(err){
           callback(err, null, null);
       }else{
           conn.query(sql, function(cerr, vals, fields){
               conn.release();
               callback(cerr, vals, fields)
           })
       }
   });
};
module.exports = query;