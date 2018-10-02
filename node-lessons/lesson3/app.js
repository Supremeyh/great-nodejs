/*
    使用 superagent 与 cheerio 完成简单爬虫
    当在浏览器中访问 http://localhost:3000/ 时，输出 CNode(https://cnodejs.org/ ) 社区首页的所有作者


*/

var express = require('express')
// superagent(http://visionmedia.github.io/superagent/ ) 是个 http库，可以发起 get 或 post 请求
var cheerio = require('cheerio')
// cheerio(https://github.com/cheeriojs/cheerio ) Node.js 版的 jquery，用来从网页中以 css selector 取数据
var superagent = require('superagent')

var app = express();

app.get('/', function(req, res,next) {
    superagent.get('https://cnodejs.org')
    .end(function(err, sres) {
        if (err) {
            return next(err)
        }

        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后就可以得到一个实现了 jquery 接口的变量，习惯性地将它命名为 $
        var $ = cheerio.load(sres.text)
        var items = []

        $("#topic_list .cell .topic_title").each(function(index, ele){
            var $ele= $(ele)
            var title = $ele.attr('title')
            var href = $ele.attr('href')
            items.push({
                "标题": title,
                "地址": 'https://cnodejs.org' + href
            })
        })

        res.send(items)

    })
})

app.listen(3000, function() {
    console.log('app is listening at port 3000')
})