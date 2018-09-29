var exec = require('child_process').exec;

function start() {
    console.log('start')
    
    var content = 'empty';

    exec("find /", function(error,stdout,stderr){
        content = stdout;
    })

    return content;
}

function upload() {
    console.log('upload')
    return 'upload'
}

exports.start = start
exports.upload = upload