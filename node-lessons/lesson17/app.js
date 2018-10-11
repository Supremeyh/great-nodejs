/**
promise


 */

// promise链, 提供了一种让函数顺序执行的方法

// 比如知道用户名，需要根据用户名从数据库中找到相应的用户，然后将用户信息传给下一个函数进行处理。

var Q = require('q')
var deferred = Q.defer()

//一个模拟数据库
var users = [{'name':'sea','pwd':'123456'}];

function getUsername (){
    return deferred.promise
}

function getUser(username){
    var user
    users.forEach(function(ele){
        if(ele.name === username){
            user = ele
        }
    })
    return user
}

getUsername()
    .then(function(username){
        return getUser(username)
    })
    .then(function(user){
        console.log(user)
    })

    deferred.resolve('sea')




// promise链
function foo(result) {
	console.log(result);
	return result+result;
}
//手动链接
Q('hello').then(foo).then(foo).then(foo); //控制台输出： hello ,hellohello, hellohellohello

//动态链接
var funcs = [foo,foo,foo];
var result = Q('hello');
funcs.forEach(function(func){
	result = result.then(func);
});

//精简后的动态链接
funcs.reduce(function(prev,current){
	return prev.then(current);
},Q('hello'));




// Q.defer()
// promise组合 串行
var Q = require('q')
var fs = require('fs')

function printFileContent(fileName){
    //要 return一个返回值 
    return function(){
        var deferred = Q.defer()
        fs.readFile(fileName, 'utf8',function(err,data){
            if(err){
                console.log('xxx  fail xxxx',err)
                deferred.reject(new Error(err))
            } else{
                console.log('=== success ===',data)
                deferred.resolve(data)
            }
        })

        return deferred.promise
    }
}

printFileContent('/Users/sea/Desktop/test.txt')() //末尾加上(),表示是个函数
    .then(printFileContent('file2.txt'))
    .then(printFileContent('file3.txt')) 
 


// promise组合 并行  控制台打印各个文件内容顺序不一定 
Q.all会在任意一个promise进入reject状态后立即进入reject状态
Q.all([printFileContent('file1.txt'),printFileContent('file2.txt'),printFileContent('file3.txt')])
    .then(function(success){
        console.log(success);
    }); 
 
//如果我们需要等到所有的promise都发生状态后(有的fulfil, 有的reject)，再转换Q.all的状态, 这时我们可以使用Q.allSettled
Q.allSettled([[printFileContent('file1.txt'),printFileContent('file2.txt'),printFileContent('file3.txt')]])
    .then(function(results){
        results.forEach(function(result){
            console.log(result)
        })
    })





/**
 结束promise链

通常，对于一个promise链，有两种结束的方式。
第一种方式是返回最后一个promise, 如 return foo().then(bar);
第二种方式就是通过done来结束promise链, 如 foo().then(bar).done(), 
为什么需要通过done来结束一个promise链呢? 如果在我们的链中有错误没有被处理，那么在一个正确结束的promise链中，这个没被处理的错误会通过异常抛出。
没有用done()结束的promise链,如出现异常，没有任何提醒，是一个潜在的bug

 */
var Q = require('q')
function testDone(msg,timeout, oops){
    var deferred = Q.defer()
    setTimeout(function(){
        console.log('000000000000000',msg)
        if(oops){
            deferred.reject(msg)
        } else{
            deferred.resolve(msg)
        }
    }, timeout)

    return deferred.promise
}

testDone('1', 2000)
    // .then(testDone('2',2000, 'oops')).then(testDone('3',2000)) //这样写无效，要retrun
    .then(function(){
       return testDone('2',2000, 'oops')
    })
    .then(function(){
       return testDone('3',2000)
    })
    .done() //抛出异常