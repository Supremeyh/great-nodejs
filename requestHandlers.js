function start() {
    console.log('start')
    function sleep(milliseconds){
        var startTime = new Date().getTime()
        while (new Date().getTime() < startTime + milliseconds);
    }

    sleep(10000);

    return 'start'
}

function upload() {
    console.log('upload')
    return 'upload'
}

exports.start = start
exports.upload = upload