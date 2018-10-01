var http = require("http");
var url = require("url");


function start(route, handle) {
    function onRequest (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('req for '+ pathname + 'is received.');

        route(handle, pathname, response)

        // response.writeHead(200, {"Content-Type": "text/plain"});
        // response.write(content);
        // response.end();
    }

    http
        .createServer(onRequest)
        .listen(8888);

        console.log('server started');
}

exports.start = start;
