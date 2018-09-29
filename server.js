var http = require("http");

function start() {
    http
        .createServer(function(req, res){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("Hello NodeJs");
            res.end();
        })
        .listen(8888);

        console.log('server started');
}

exports.start = start;
