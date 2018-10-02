/*
目标:当在浏览器中访问 http://localhost:3000/?person=sea 时，输出 alsotang 的 md5 值，即 bdd5e57b5c0040f9dc23d430846e68a3。
*/

var express = require('express')
var utility = require('utility')

var app= express()

app.get('/', function(req, res) {
    // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入body-parser 这个中间件
    var person =  req.query.person
    var md5Value = y=utility.md5(person)
    res.send(md5Value)
})

app.listen(3000, function(req, res) {
    console.log('app is runing at port 3000')
})


//当打开浏览器输入http://localhost:3000/?person=sea时，输入sea的md5值; 否则报错,从 crypto.js 中抛出的。这是因为，当我们不传入 person参数时，req.query.person参数时，req 取到的值是 undefined，utility.md5 直接使用了这个空值，导致下层的 crypto 抛错