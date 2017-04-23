const MAX = 20;
const name = 'kkk1234567';
const testPass = 'vsrwhetj';

const crypt = require('../index').crypt;
const decrypt = require('../index').decrypt;
const m = require('../index');

const check = async ()=>{
    for (let i=0; i<MAX; i++){
        const w = await m.isExistCachePromise('da9a08183a6c6fec892e25cdb84c533e' , './work')
    }
    return ;
}

let u3 = new Date();
check();
let u4 = new Date();
console.log('check = ' + (u4 - u3) + 'ms');

let u = new Date();
for (let i=0; i<MAX; i++){
    const decrypted = decrypt('da9a08183a6c6fec892e25cdb84c533e' , testPass);
}
let u2 = new Date();
console.log((u2 - u) + 'ms');

return;
