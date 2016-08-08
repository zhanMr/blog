'use strict'
let request = require("request");
let cheerio = require("cheerio");
let fs = require('fs');
let path = require('path');
let http = require('http');
let iconv = require('iconv-lite');
let async = require('async');
let xlsx = require('node-xlsx');
let all = [];
let link = [];
let links = [];
let data = [];
let time = (new Date()).getTime();

function reptile(url){
    return new Promise(function(resolve, reject){
        request({
            url: url,
            encoding: null
        }, (error, response, body) => {
            if(!error && response.statusCode == 200){
                resolve(body);
            }else{
                reject(error);
            }
        })
    })
}
//请求主页
reptile('').then(body => {
    let $ = cheerio.load(iconv.decode(body, 'gb2312'), {decodeEntities: false});
    $('a').each((index, item)=> {
        all.push({
            sub: $(item).text(),
            href: $(item).attr('href')
        })
    })

    function firstPage(url, callback){
        reptile(url.href).then(body => {
        let $ = cheerio.load(iconv.decode(body, 'gb2312'));
        let homeLink = $('td b a');
        $('a').each((index, item) => {
            let title = $(item).text();
            let href = $(item).attr('href');
            link.push({
                sub: url.sub,
                title: title,
                href: href
            })
        })
        callback();
        }, error => {
            console.log('error', error);
        })  
    }

    function secondPage(){
        function subPage(url, callback){
            reptile(url.href).then(body => {
                let $ = cheerio.load(iconv.decode(body, 'gb2312'));
                $('a').each((index, item) => {
                let secondHref = $(item).attr('href');
                links.push({
                    sub: url.sub,
                    title: url.title,
                    href: secondHref
                })
            });
            callback(null);
            }, error => {})
        }
        async.mapLimit(link, 5, (url, callback) =>{
            subPage(url, callback);
        }, (error,result)=>{
            //执行第三步请求
            console.log('第二步完成！');
            thirdPage();
        });
    }
    
    function thirdPage(){
        function therePage(url, callback){
            reptile(url.href).then(body => {
            let $ = cheerio.load(iconv.decode(body, 'gb2312'), {decodeEntities: false}),
                data.push([url.sub, url.title]);
                callback(null);
            }, error => {})
        }c
        async.mapLimit(links, 5, (url, callback) =>{
            therePage(url, callback);
        }, (error,result)=>{
            console.log('第三步完成，正在写入excel！');
            let buffer = xlsx.build([{name: "mySheetName", data: data}]);
            fs.writeFileSync(path.join(__dirname, 'good.xlsx'), buffer, 'binary');
            console.log("恭喜你，完成了。用时" + Math.floor(((new Date()).getTime() - time)/1000) + '秒');
        });
    }
    async.mapLimit(all, 5, (url, callback) =>{
            firstPage(url, callback);
        }, (error,result)=>{
            //执行第三步请求
            console.log('第一步完成！');
            secondPage();
    });
}, error=>{
    console.log(error)
})
