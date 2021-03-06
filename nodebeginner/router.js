function route(handle,pathname, res, request) {
    console.log('about to route a req for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname](res, request)
    } else {
        console.log('no req for ' + pathname)

        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write('404');
        res.end();

        return '404'
    }
}

exports.route = route;
