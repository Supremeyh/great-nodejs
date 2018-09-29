var http = require("http");
var url = require("url");


function start(route, handle) {
    http
        .createServer(function(req, res){
            var pathname = url.parse(req.url).pathname;
            console.log('req for '+ pathname + 'is received.');

            res.writeHead(200, {"Content-Type": "text/plain"});

            var content = route(handle, pathname);

            res.write(content);
            res.end();
        })
        .listen(8888);

        console.log('server started');
}

exports.start = start;
