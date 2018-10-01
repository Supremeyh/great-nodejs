// var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');

function start(res) {
    console.log('start')

    var body = `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <textarea name="text" id="text" cols="30" rows="10"></textarea>
                    <input type="file" value="upload"/>
                    <input type="submit" value="Upload File"/>
                </form>
            </body>
        </html>
    `

     // exec("find /", 
    // { timeout: 10000, maxBuffer: 20000 * 1024},
    // function(error,stdout,stderr){
    //     res.writeHead(200, {"Content-Type": "text/plain"});
    //     res.write(stdout);
    //     res.end();
    // })

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();

}

function upload(res, postData) {
    console.log('upload')
    res.writeHead(200, {"Content-Type": "text/plain"});
    // res.write('you have sent: ' + postData);
    res.write('you have sent: ' + querystring.parse(postData).text);
    res.end();
}

function show (res, postData) {
    console.log('request handler show was called')
    fs.readFile('/tem/test.png', 'binary', function(error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type": "text/plain"})
            res.write(error + '\n');
            res.end()
        } else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end()
        }

    })
}

exports.start = start
exports.upload = upload
exports.show = show