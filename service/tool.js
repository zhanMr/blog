//工具类
'use strict';
let ctypto = require('crypto');
class Tool{
    //加密
    encrypt(str, type){
        let encrypt = ctypto.createHash(type);
        encrypt.update(str.toString());
        return encrypt.digest('hex');
    }
}
module.exports = Tool;