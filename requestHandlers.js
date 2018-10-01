// var exec = require('child_process').exec;

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
                <form action="/upload" method="post">
                    <textarea name="text" id="text" cols="30" rows="10"></textarea>
                    <input type="submit" value="Submit File"/>
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

function upload(res) {
    console.log('upload')
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write('upload');
    res.end();
}

exports.start = start
exports.upload = upload