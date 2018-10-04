/*
    使用 eventproxy 控制并发
    输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式
 */


var superagent = require('superagent')
var cheerio = require('cheerio')

 //使用 eventproxy 控制并发， https://github.com/JacksonTian/eventproxy
var eventProxy = require('eventproxy')

var url = require('url')
var cnodeUrl = 'https://cnodejs.org/'


superagent.get(cnodeUrl)
    .end(function(err, res){
    if (err){
        return console.error(err)
    }

    var topicUlrs = []
    var $ = cheerio.load(res.text)

    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function(index, ele){
        var $ele = $(ele)
        var href = $ele.attr('href') ///topic/a
        // resolve，http://nodejs.org/api/url.html#url_url_resolve_from_to 
        var wholeHref = url.resolve(cnodeUrl, href) //https://cnodejs.org/topic/a
        topicUlrs.push(wholeHref)
    })

    // eventproxy起到了 高等计数器计数器 的作用，来管理到底这些异步操作是否完成，完成之后，会自动调用你提供的处理函数，并将抓取到的数据当参数传过来
    var ep = new eventProxy()

    // 命令 ep 重复监听 topicUrls.length 次, topic_html 事件再行动
    ep.after('topic_html', topicUlrs.length, function(topics){
        topics = topics.map(function(topicPair) {
            var topicUrl = topicPair[0]
            var topicHtml = topicPair[1]
            var $ = cheerio.load(topicHtml)

            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim()
            })
        })

        console.log('final: ')
        console.log(topics)

    })

    topicUlrs.forEach(function(topicUrl){
        superagent.get(topicUrl)
            .end(function(err, res) {
                console.log('fetch ' + topicUrl + ' successful')
                ep.emit('topic_html', [topicUrl, res.text])
            })

    })

});


/**
 eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：
1、先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
2、告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。
3、在适当的时候 ep.emit('event_name', eventData)。 

ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {});
这一句，监听了三个事件，分别是 data1_event, data2_event, data3_event，每次当一个源的数据抓取完成时，就通过 ep.emit() 来告诉 ep 自己，某某事件已经完成了。
当三个事件未同时完成时，ep.emit() 调用之后不会做任何事；当三个事件都完成的时候，就会调用末尾的那个回调函数，来对它们进行统一处理。
 */