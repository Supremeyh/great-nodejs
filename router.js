function route(handle,pathname, res) {
    console.log('about to route a req for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname](res)
    } else {
        console.log('no req for ' + pathname)

        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write('404');
        res.end();

        return '404'
    }
}

exports.route = route;
