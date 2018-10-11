/**
 Connect

Connect的思想跟middlewares+next的思想基本一样，先将处理逻辑存起来，然后循环调用。

Connect中主要有五个函数
 */

 // require module
 var connect = require('connect')
 var http = require('http')

 // create app
 var app = connect()

//  gzip outgoing response
var compression = require('compression')
app.use(compression())


// store session state in browser cookie
var cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))


// Use middleware、 Mount middleware
app.use('/foo', function(req,res,next){
    console.log('foo')
    res.end('foo')
    next()
})

app.use('/bar', function(req,res,next){
    console.log('bar')
    res.setHeader('Content-Type', 'text/plain')
    res.end('bar')
    next()
}) 

// respond to all requests
app.use(function(req, res){
    res.end('hello from connect! \n')
})



//create node.js http server and listen on port
http.createServer(app).listen(5201,function(){console.log('listen at 5201')})


 