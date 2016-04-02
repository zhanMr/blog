'use strict';
let fs = require('fs');
let path = require('path');
let http = require('http');

//###一些学习笔记
//*********************************************************************************************
//调试方法(Node Inspector)
//(1)npm install -g node-inspector
//(2)node-inspector
//(3)node --debug ./bin/www
//(4)http://127.0.0.1:8080/debug?port=5858
//*********************************************************************************************

//*********************************************************************************************
//文件操作与流
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
//文件上传
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