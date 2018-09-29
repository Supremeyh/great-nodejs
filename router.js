function route(handle,pathname) {
    console.log('about to route a req for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname]()
    } else {
        console.log('no req for ' + pathname)
        return '404'
    }
}

exports.route = route;
