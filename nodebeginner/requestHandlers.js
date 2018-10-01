// var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
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
                    <input type="file" name="upload"  multiple="multiple"/>
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

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response, request) {
    console.log('upload')

    var form = new formidable.IncomingForm()
    form.parse(request,function(error, fields, files) {
        fs.renameSync(files.upload.path, '/tmp/test.png')
    })
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('received image: ')
    response.write("<img src='/show' />");
    response.end();
}

function show (response) {
    console.log('request handler show was called')
    fs.readFile('/tmp/test.png', 'binary', function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"})
            response.write(error + '\n');
            response.end()
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end()
        }

    })
}

exports.start = start
exports.upload = upload
exports.show = show