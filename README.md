# lambda-stateless-usercache

## install
```
yarn add lambda-stateless-usercache
```
## Functions
```
const crypt = require('lambda-stateless-usercache').crypt;
const decrypt = require('lambda-stateless-usercache').decrypt;
const getUniqueStr = require('lambda-stateless-usercache').getUniqueStr;
const writeCachePromise = require('lambda-stateless-usercache').writeCachePromise;
const isExistCachePromise = require('lambda-stateless-usercache').isExistCachePromise;

```
## Use Case

```
  // login
  const sessionStr = userId + '__' +  getUniqueStr()
  const token =  JSON.stringify({
    expire : new Date() + future,
    userInfo : {
      id : xxx,
      name : uuuu
    }
  });
  const encryptedToken = crypt(token , 'myKey')
  
  await wrireCachePromise(sessionStr)
  
  response.headers['token'] = encryptedToken;
  response.headers['loginSession'] = sessionStr;

```

```
  // login check
  const isExistSession = await isExistCachePromise(request.headers.loginSession)
  if (!isExistSession){
    let token;
    try {
      token = JSON.parse(decrypt(request.headers.token , 'myKey'));
    } catch(err){
      logout()
    }
    if (token.expire < new Date()){
      logout()
    }
    
    const sessionStr = token.userInfo.userId + '__' +  getUniqueStr()
    await wrireCachePromise(sessionStr)
 
    response.headers['loginSession'] = sessionStr;
     
  }


```
