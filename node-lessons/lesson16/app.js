/** 
cookie和session

cookie
    HTTP 是一个无状态协议，所以客户端每次发出请求时，下一次请求无法得知上一次请求所包含的状态数据
    首先产生了 cookie 这门技术来解决这个问题，cookie 是 http 协议的一部分，它的处理分为如下几步：
        服务器向客户端发送 cookie。
        通常使用 HTTP 协议规定的 set-cookie 头操作。
        规范规定 cookie 的格式为 name = value 格式，且必须包含这部分。
        浏览器将 cookie 保存。
        每次请求浏览器都会将 cookie 发向服务器。

        httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到 cookie。
 */

    // express4 中的 cookie,  使用 cookie-parser 模块(https://github.com/expressjs/cookie-parser )。
    // var express = require('express')
    // var cookieParser = require('cookie-parser')

    // var app = express()
    // app.listen(3000)

    // app.use(cookieParser())

    // app.get('/',function(req, res){
    //     if(req.cookies.isSigned){
    //         console.log(req.cookies)
    //         res.send('welcome back')
    //     } else{
    //         res.cookie('isSigned', 1, {maxAge: 60*1000})
    //         res.send('Nice to See ya')
    //     }
    // })



    // ..............................................................................................//
    // ..............................................................................................//

/**
 * session
 
cookie 虽然很方便，但是使用 cookie 有一个很大的弊端，cookie 中的所有数据在客户端就可以被修改，数据非常容易被伪造，
而且如果 cookie 中数据字段太多会影响传输效率。为了解决这些问题，就产生了 session，session 中的数据是保留在服务器端的。

session 的运作通过一个 session_id 来进行。session_id 通常是存放在客户端的 cookie 中，比如在 express 中，默认是 connect.sid 这个字段，
当请求到来时，服务端检查 cookie 中保存的 session_id 并通过这个 session_id 与服务器端的 session data 关联起来，进行数据的保存和修改。

这意思就是说，当你浏览一个网页时，服务端随机产生一个 1024 比特长的字符串，然后存在你 cookie 中的 connect.sid 字段中。
当你下次访问时，cookie 会带有这个字符串，然后浏览器就知道你是上次访问过的某某某，然后从服务器的存储中取出上次记录在你身上的数据。
由于字符串是随机产生的，而且位数足够多，所以也不担心有人能够伪造。

session 可以存放在 1）内存、2）cookie本身、3）redis 或 memcached 等缓存中,比较常见 4）数据库中,查询效率低。

express 中操作 session 要用到 express-session (https://github.com/expressjs/session ) ,
主要的方法就是 session(options)，其中 options 中包含可选参数，主要有：
    name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
    store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等, express 生态中都有相应模块的支持。
    secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie: 设置存放 session id 的 cookie 的相关选项，默认为
    (default: { path: '/', httpOnly: true, secure: false, maxAge: null })
    genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
    rolling: 每个请求都重新设置一个 cookie，默认为 false。
    resave: 即使 session 没有被修改，也保存 session 值，默认为 true
 */

// 一、在内存中存储 session, express-session 默认使用内存来存 session，对于开发调试来说很方便。
// var express = require('express')

// var session = require('express-session')

// var app = express()

// app.listen(5201)

// app.use(session({
//     secret: 'recommand 128 bytes random string',
//     cookie: {maxAge: 60*1000}
// }))

// app.get('/',function(req,res){
//     if(req.session.isSigned){
//         req.session.isSigned++
//         res.send('Welcome back ' + req.session.isSigned + ' times')
//     }else{
//         req.session.isSigned = 1
//         res.send('Nice to see ya')
//         console.log(req.session)
//     }

// })

// 二、在 redis 中存储 session, session 存放在内存中不方便进程间共享，因此可以使用 redis 等缓存来存储 session。
// 可以使用 connect-redis 模块(https://github.com/tj/connect-redis )来得到 redis 连接实例，然后在 session 中设置存储方式为该实例。
var express = require('express')
var session = require('express-session')
var redisStore = require('connect-redis')(session)

var app = express()

app.listen(5201)

app.use(session({
    // name: 'session_id',
    store: new redisStore(),
    secret: 'somesecrettoken',
    resave:false,
    // cookie: {httpOnly: true,secure:false,maxAge:60*1000}
}))

app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('oh no'))
    }
    next()
})

app.get('/',function(req,res){
    if(req.session.isSinged){
        req.session.isSinged++
        res.send('Welcome back ' + req.session.isSinged + ' times')
    }else{
        req.session.isSinged = 1
        res.send('Nice to see ya')
        console.log(req.session)
    }
})