/**
 connect中间件

 从 httpServer 到 Express 的升级过程。
 */


// 一、Nodejs经典httpServer
var http = require('http')

// http请求的响应函数，是所有请求的入口函数。
function requestHandler(req, res) {
    res.end('hello nodejs')
}

var server = http.createServer(requestHandler)
server.listen(5201)




// 二、加上具体业务逻辑, 可以抽离函数，每个逻辑一个函数，简单好实现低耦合好维护。

//根据http协议从req中解析body, 检测请求中请求体是否存在，若存在则解析请求体；
function parseBody(req,cb){
    cb(null, body)
}

//根据body.id在Database中检测，返回结果
function checkIdInDataBase(body,cb){
    cb(null, dbResult)
}

// 根据数据库结果返回约定的值；
function returnResult(dbResult,res){
    if(dbResult && dbResult.length>0){
        res.end('true')
    } else{
        res.end('false')
    }
}

function requestHandler1(req, res){
    parseBody(req, function(err, body){
        checkIdInDataBase(body, function(err, dbResult){
            returnResult(dbResult, res)
        })
    })
}

// 三、业务逻辑越来越复杂，出现回调地狱， 有四种解决办法。
// EventProxy —— 事件发布订阅模式(lesson4)
// BlueBird —— Promise方案(lesson17)
// Async —— 异步流程控制库(lesson5),  Connect和Express
// Generator —— ES6原生Generator

// 异步流程控制库首先要求用户传入待执行的函数列表，记为funlist。流程控制库的任务是让这些函数 顺序执行 。
// callback是控制顺序执行的关键，funlist里的函数每当调用callback会执行下一个funlist里的函数
// 动手实现一个类似的链式调用，其中 funlist 更名为 middlewares、callback 更名为 next

var middlewares = [
    function fun1(req,res, next){
        parseBody(req,function(err,body){
            if(err) return next(err)
            req.body = body
            next()
        })
    },
    function fun2(req,res,next){
        checkIdInDataBase(req.body.id,function(err,rows){
            if(err) return next(err)
            res.dbResult = rows
            next()
        })
    },
    function fun3(req,res,next){
        if(res.dbResult && res.dbResult.length>0){
            res.end('true')
        } else{
            res.end('false')
        }
        next()
    }
]

function requestHandler2(req,res){
    var i = 0
    //由middlewares链式调用
    function next(err){
        if(err){
            return res.send('err: ', err.toString())
        }
        if(i<middlewares.length){
            middlewares[i++](req,res,next)
        }else{
            return
        }

        //触发第一个middleware
        next();
    }

}

// 上面用middlewares+next完成了业务逻辑的 链式调用，而middlewares里的每个函数，都是一个 中间件。
// 整体思路是: 将所有 处理逻辑函数(中间件) 存储在一个list中； 请求到达时, 循环调用 list中的 处理逻辑函数(中间件)；