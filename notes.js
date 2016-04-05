'use strict';
let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let qs = require('querystring');
let crypto = require('crypto');

//###一些学习笔记
//*********************************************************************************************
//###调试方法(Node Inspector)
//(1)npm install -g node-inspector
//(2)node-inspector
//(3)node --debug ./bin/www
//(4)http://127.0.0.1:8080/debug?port=5858
//*********************************************************************************************

//*********************************************************************************************
//###加密解密
//@@ 哈希算法，是指将任意长度的二进制值映射为较短的固定长度的二进制值，这个小的二进制值称为哈希值
//## 打印所有hash(crypto.getHashes())加密时间
let crytoTime = (crytoArr) => {
    crytoArr.forEach((item) => {
        let read = fs.createReadStream(path.join(__dirname, 'webpack.config.js'));
        let hash = crypto.createHash(item);
        let time = (new Date()).getTime();
        let data = '';
        read.on('data',(chunk) => {
            hash.update(chunk);
        })
        read.on('end',()=>{
            console.log(item, '加密时间',(new Date()).getTime() - time, 'ms');
            console.log(hash.digest('hex'));
        })
    })
};
//crytoTime(crypto.getHashes());
//@@ HMAC
//HMAC 结合了哈希算法和加密密钥，是为了阻止对签名完整性的一些恶意攻。这意味着HMAC 同时使用了哈希算法（如上一小节所介绍的一些算法）以及一个加密密钥
let hmacTime = (crytoArr, key) => {
    crytoArr.forEach((item) => {
        let read = fs.createReadStream(path.join(__dirname, 'webpack.config.js'));
        let hmac = crypto.createHmac(item, key);
        let time = (new Date()).getTime();
        let data = '';
        read.on('data',(chunk)=>{
            hmac.update(chunk);
        });
        read.on('end',()=>{
            console.log(item, '加密时间',(new Date()).getTime() - time, 'ms');
            console.log(hmac.digest('hex'));
        });
    })
};
//hmacTime(crypto.getHashes(), 'zz');
//@@ 加密和解密
//对称加密: 通信一方用KEK加密明文，另一方收到之后用同样的KEY来解密就可以得到明文
//不对称加密 使用两把完全不同但又是完全匹配的一对Key:公钥和私钥。在使用不对称加密算法加密文件时，只有使用匹配的一对公钥和私钥，才能完成对明文的加密和解密过程
let encryption = function(crytoArr){
    crytoArr.forEach((item) => {
        let read = fs.createReadStream(path.join(__dirname,'webpack.config.js'));
        let key = "abefg";
        let enctypted = '';
        let cipher = crypto.createCipher(item, key);
        let time = (new Date()).getTime();
        read.on('data', (chunk)=>{
            //加密
            enctypted += cipher.update(chunk, 'binary', 'hex');
            enctypted += cipher.final('hex');
        });
        read.on('end', ()=> {
            console.log(item, '加密时间',(new Date()).getTime() - time, 'ms');
            console.log(enctypted);
            //解密
            let decrypted = '';
            let decipher = crypto.createDecipher(item, key);
            decrypted += decipher.update(enctypted, 'hex', 'binary');
            decrypted += decipher.final('binary');
            console.log((new Buffer(decrypted)).toString());
        })
    });
};
//console.log(crypto.getCiphers());
//encryption(['blowfish','aes-256-cbc','cast','des','des3','idea','rc2','rc4','seed']);
//*********************************************************************************************

//*********************************************************************************************
//###URL
let detalUrl = () => {
    let myUrl = "http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash";
    //console.log(url.parse(myUrl));
    //返回下面的结果
    // {
    // protocol: 'http:',
    // slashes: true,
    // auth: null,
    // host: 'www.nodejs.org',
    // port: null,
    // hostname: 'www.nodejs.org',
    // hash: '#alsoahash',
    // search: '?with=query&param=that&are=awesome',
    // query: 'with=query&param=that&are=awesome',
    // pathname: '/some/url/',
    // path: '/some/url/?with=query&param=that&are=awesome',
    // href: 'http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash'
    // }
    //console.log(url.parse(myUrl, true));
    // 返回下面的结果
    // {
    //protocol: 'http:',
    //slashes: true,
    //auth: null,
    //host: 'www.nodejs.org',
    //port: null,
    //hostname: 'www.nodejs.org',
    //hash: '#alsoahash',
    //search: '?with=query&param=that&are=awesome',
    //query: { with: 'query', param: 'that', are: 'awesome' },
    //pathname: '/some/url/',
    //path: '/some/url/?with=query&param=that&are=awesome',
    //href: 'http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash'
    // }
    //console.log(qs.parse(url.parse(myUrl).query));
    //返回下面的结果
    //{ with: 'query', param: 'that', are: 'awesome' }
};
detalUrl();
//*********************************************************************************************

//*********************************************************************************************
//###文件操作与流
let createFile = (source, file) => {
    fs.readdir(source, (err, data) => {
        if(!err){
            data.forEach((item) => {
                fs.stat(path.join(source, item), (errs, stats) => {
                    if(!errs){
                        //是否是文件
                        if(stats.isFile()){
                            var readerStream = fs.createReadStream(path.join(source, item));
                            var writerStream = fs.createWriteStream(path.join(file, item));
                            readerStream.pipe(writerStream);
                            //是否是文件夹
                        }else if(stats.isDirectory()){
                            //创建目标目录
                            fs.mkdir(path.join(file, item), (errss) => {
                                if(!errss) return createFile(path.join(source, item), path.join(file, item));
                            });
                        }
                    }
                })
            });
        }
    });
};
//复制目录a的文件到目录b
createFile(path.join(__dirname, 'a'), path.join(__dirname, 'b'));
//*********************************************************************************************
//*********************************************************************************************
//###文件上传
//模块地址 https://www.npmjs.com/package/formidable
//##node部分
/*router.post('/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname, 'a');
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req,(err, fields, files) => {
        console.log("上传文件成功!!!");
        res.end();
    });
});*/
//##HTML部分
/*<form action="/myblog/upload" method="post" encType="multipart/form-data">
    <input type="file" name="file" id="file" />
    <input type="submit" name="submit" value="Submit" />
</form>*/
//*********************************************************************************************