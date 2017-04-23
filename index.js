let defaultCacheDir = '/tmp';
const crypto = require('crypto');
const exec = require('child_process').exec;

module.exports.setCacheDir = (dir)=>{
   defaultCacheDir = dir;
}

module.exports.isExistCachePromise = (name /* string */ , _cacheDir)=>{
    const cacheDir = _cacheDir ? _cacheDir : defaultCacheDir ;
    const encoded = new Buffer(name.replace(/\/$/) , '').toString('base64');

    return new Promise((res , err)=>{

        exec(`ls -a ${cacheDir}/lambdaCache/${encoded}`, {timeout: 20}, function (error, stdout, stderr) {
            if(stdout){
                res(true)
                return;
            }
            if(stderr){
                res(false)
            }
            if (error !== null) {
                res(false)
            }
            return;
        });
    });
}

module.exports.writeCachePromise = (name /* string */ , _cacheDir)=>{
    const cacheDir = _cacheDir ? _cacheDir : defaultCacheDir ;
    const encoded = new Buffer(name.replace(/\/$/) , '').toString('base64');

    return new Promise((res , err)=>{

        exec(`mkdir -p ${cacheDir}/lambdaCache/${encoded}`, {timeout: 50}, function (error, stdout, stderr) {
            if(stdout){
                res(true)
                return;
            }
            if(stderr){
                throw new Error(stderr);
            }
        });
    });
}

module.exports.getUniqueStr = ()=>{
    var strong = 1000;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(6)
}

module.exports.crypt = (planeText , password)=>{
    var cipher = crypto.createCipher('aes192', password);
    cipher.update(planeText, 'utf8', 'hex');
    var cipheredText = cipher.final('hex');
    return cipheredText;
}

module.exports.decrypt = (cipheredText , password)=>{
    var decipher = crypto.createDecipher('aes192', password);
    decipher.update(cipheredText, 'hex', 'utf8');
    var dec = decipher.final('utf8');
    return dec;
}

