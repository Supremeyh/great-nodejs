var express =require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventProxy = require('eventproxy')

var url = require('url')
var cnodeUrl = 'https://cnodejs.org/'

var app = express()

superagent.get(cnodeUrl)
.end(function(err, res){
    if (err){
        return console.error(err)
        // next(err) 
    }

    var topicUlrs = []
    var $ = cheerio.load(res.text)

    $('#topic_list .topic_title').each(function(index, ele){
        var $ele = $(ele)
        var href = $ele.attr('href')
        var wholeHref = url.resolve(cnodeUrl, href)
        topicUlrs.push(wholeHref)
    })
    console.log(topicUlrs)

})

