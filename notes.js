'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const qs = require('querystring');
const crypto = require('crypto');
const q = require('q');
const events = require('events');
//###一些学习笔记
//*********************************************************************************************
//###事件触发和事件监听
let emitter = new events.EventEmitter();
emitter.on('doing', function(){
    //fs.open( path, flags,  [mode], callback);
    //'r' - 以只读方式打开文件，当文件不存在的时候发生异常
    //'r+' - 以读写方式打开文件，当文件不存在的时候发生异常
    //'rs' - 以只读方式同步打开文件，绕过本地缓存文件进行系统操作
    //'rs+' - 以读写方式同步打开文件 ，绕过本地缓存文件进行系统操作
    //'w' - 以只写方式打开文件，当文件不存在时创建文件，或者存在的时候覆盖文件
    //'wx' - 与'w'一致，但只适用于文件不存在的时候( 测试的时候,，node版本为v0.10.26，如果文件不存在则正常创建文件并且写入数据，但是当文件不存在的时候，报错为必须要写上callback，加上callback后不报错但是不执行任何操作。 )
    //'w+' - 以读写方式打开文件
    //'ws+' - 与'w+'一致，但只适用于文件不存在的时候
    //'a' - 以添加数据的方式打开文件，文件不存在则创建
    //'a+' - 以添加和读取的方式打开文件，文件不存在则创建
    //'ax+' - 与'a+'一致，但是存在的时候会失败
    //mode为：设置文件的模式，默认为 0666，可读可写。
    fs.open(path.join(__dirname, 'event.js'), 'w', ()=>{
        let writeStream = fs.createWriteStream(path.join(__dirname, 'event.js'));
        let writeFile = (filePath) => {
            fs.readdir(filePath, (err, files)=>{
                if(!err){
                    files.forEach((item) =>{
                        fs.stat(path.join(filePath, item), (errs, file)=>{
                            if(file.isFile()){
                                let data = '';
                                let readStream = fs.createReadStream(path.join(filePath, item));
                                readStream.on('data', (chunk)=>{
                                    data += chunk;
                                });
                                readStream.on('end', ()=>{
                                    writeStream.write(data);
                                });
                            }else if(file.isDirectory()){
                                return writeFile(path.join(filePath, item));
                            }
                        });
                    });
                }
            });
        };
        writeFile(path.join(__dirname, 'routes'));
    });
});
//###异步编程解决方案
//###Promise实现之q.js
let writeFiles = ()=>{
    let writeStream;
    q.nfcall(fs.open, path.join(__dirname, 'event.js'), 'w').then(()=>{
        writeStream = fs.createWriteStream(path.join(__dirname, 'event.js'));
        writeFile(path.join(__dirname, 'routes'));
    });
    let eachFile = (files,filePath)=>{
        files.forEach((item)=>{
            q.nfcall(fs.stat, path.join(filePath, item)).then((file)=>{
                if(file.isFile()){
                    let data = '';
                    let readStream = fs.createReadStream(path.join(filePath, item));
                    readStream.on('data', (chunk)=>{
                        data += chunk;
                    });
                    readStream.on('end', ()=>{
                        writeStream.write(data);
                    });
                }else if(file.isDirectory()){
                    return writeFile(path.join(filePath, item));
                }
            })
        })
    };
    let writeFile = (filePath)=>{
        q.nfcall(fs.readdir, filePath).then((files)=>{
            eachFile(files,filePath);
        })
    }
};
//writeFiles();
//emitter.emit('doing');
//*********************************************************************************************
//*********************************************************************************************
//###调试方法(Node Inspector)
//(1)npm install -g node-inspector
//(2)node-inspector
//(3)node --debug ./bin/www
//(4)http://127.0.0.1:8080/debug?port=5858
//*********************************************************************************************

//*********************************************************************************************
//###node中实现Promise(https://www.npmjs.com/package/q)
let readDefer = function(){
    let deferred = q.defer();//通过延迟对象来创建promise对象
    fs.readFile(path.join(__dirname, 'webpack.config.js'), 'utf8', (err, content) => {
        if(err){
            deferred.reject(new Error(err));
        }else{
            deferred.resolve(content);
        }
    });
    return deferred.promise;
}
//readDefer().then(function(data){console.log(data)},function(err){console.log(err)});
let readFcall = function(){
    return q.nfcall(fs.readFile,path.join(__dirname, 'webpack.config.js', 'utf-8'));
};
//readFcall().then(function(data){console.log(data)},function(err){console.log(err)});
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