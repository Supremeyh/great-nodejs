/**
 使用 async 控制并发
 输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式, 并发连接数需要控制在 5 个。

 一次性发了 40 个并发请求出去，别的网站有可能会因为你发出的并发连接数太多而当你是在恶意请求，把你的 IP 封掉,
 如果有 1000 个链接要去爬，那么不可能同时发出 1000 个并发链接出去,控制一下并发的数量，比如并发 10 个就好，然后慢慢抓完这 1000 个链接,
 用 async 来做这件事很简单。

 什么时候用 eventproxy，什么时候使用 async ？当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；
 当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。

 */

var async = require('async')

// 并发连接数的计数器
var concurrencyCount = 0
//伪造一个 fetchUrl(url, callback) 函数,调用它时，它会返回 url的页面内容回来
var fetchUrl = function(url, cb){
    // delay 的值在 2000 以内，是个随机的整数
    var delay = parseInt((Math.random()*10000000)%2000, 10)
    concurrencyCount++
    console.log('当前并发数', concurrencyCount, '抓取', url, '耗时', delay, '毫秒')

    setTimeout(function(){
        concurrencyCount--
        cb(null, url+ ' html content')
    }, delay)
}

var ulrs = []
for(var i=0; i< 30; i++){
    ulrs.push('http://datasource_' + i)
}

//并发连接数控制 async 的 mapLimit(arr, limit, iterator, callback)
async.mapLimit(ulrs, 5, function(url, cb){
    fetchUrl(url,cb)
},function(err, result){
    console.log('final: ', result)
})