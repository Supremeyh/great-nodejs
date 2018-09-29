var http = require("http");
var url = require("url");


function start(route, handle) {
    http
        .createServer(function(req, res){
            var pathname = url.parse(req.url).pathname;
            console.log('req for '+ pathname + 'is received.');

            route(handle, pathname);

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("Hello NodeJs");
            res.end();
        })
        .listen(8888);

        console.log('server started');
}

exports.start = start;
