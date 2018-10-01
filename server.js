var http = require("http");
var url = require("url");
var fomidable = require('formidable')


function start(route, handle) {
    function onRequest (request, response) {
        var postData = '';
        var pathname = url.parse(request.url).pathname;
        console.log('request for '+ pathname + 'is received.');

        request.setEncoding('utf8');

        request.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
            console.log('postDataChunk: ' + postDataChunk);
        })

        request.addListener('end', function() {
            route(handle, pathname, response, postData);
        })

    }

    http
        .createServer(onRequest)
        .listen(8888);

        console.log('server started');
}

exports.start = start;
